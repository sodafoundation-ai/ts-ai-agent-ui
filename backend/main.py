from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import uuid
import json
import os
import subprocess
import yaml
from datetime import datetime

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
# Set this to the path of your ts-ai-agent repository
TS_AGENT_PATH = os.environ.get("TS_AGENT_PATH", "../ts-ai-agent")
USE_REAL_AGENT = os.environ.get("USE_REAL_AGENT", "false").lower() == "true"

# Data Models
class ChatMessage(BaseModel):
    role: str  # "user" or "bot"
    content: str
    timestamp: str

class ChatSession(BaseModel):
    id: str
    name: str
    created_at: str
    messages: List[ChatMessage]

class ChatRequest(BaseModel):
    query: str
    session_id: str

class SessionCreateRequest(BaseModel):
    name: str

class SessionUpdateRequest(BaseModel):
    name: str

# Storage (JSON File)
DATA_FILE = "chat_history.json"

def load_data() -> Dict[str, ChatSession]:
    if not os.path.exists(DATA_FILE):
        return {}
    try:
        with open(DATA_FILE, "r") as f:
            data = json.load(f)
            # Convert dict back to ChatSession objects
            return {k: ChatSession(**v) for k, v in data.items()}
    except json.JSONDecodeError:
        return {}

def save_data(data: Dict[str, ChatSession]):
    with open(DATA_FILE, "w") as f:
        # Convert ChatSession objects to dicts for JSON serialization
        json.dump({k: v.model_dump() for k, v in data.items()}, f, indent=4)

def query_ts_agent(query: str) -> str:
    """
    Query the ts-ai-agent with a natural language query.
    Returns the agent's response as a formatted string.
    """
    if not USE_REAL_AGENT:
        # Mock response
        return f"**Mock Response**\n\nThis is a simulated response to: '{query}'\n\nTo enable real agent integration:\n1. Clone https://github.com/rohithvaidya/ts-ai-agent (dev branch)\n2. Set TS_AGENT_PATH environment variable to the repository path\n3. Set USE_REAL_AGENT=true\n4. Configure Prometheus and Ollama as per the repository README"
    
    try:
        # Create a temporary query file
        temp_query_file = f"temp_query_{uuid.uuid4().hex[:8]}.yaml"
        query_data = {"queries": [query]}
        
        with open(temp_query_file, "w") as f:
            yaml.dump(query_data, f)
        
        # Run the ts-ai-agent CLI
        cmd = [
            "python",
            os.path.join(TS_AGENT_PATH, "pkg", "cli.py"),
            "--query-set", temp_query_file,
            "--copilot", "DYNAMIC_PROMPT",
            "--prometheus-config", os.path.join(TS_AGENT_PATH, "config", "prometheus_config.yaml")
        ]
        
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=30,
            cwd=TS_AGENT_PATH
        )
        
        # Clean up temp file
        if os.path.exists(temp_query_file):
            os.remove(temp_query_file)
        
        if result.returncode != 0:
            return f"**Error executing agent**\n\nStderr: {result.stderr}\n\nMake sure:\n1. Prometheus is running\n2. Ollama is running with a model\n3. Agent is properly configured"
        
        # Parse the output (adjust based on actual output format)
        # The agent outputs YAML files, so we'd need to read the output file
        # For now, return stdout
        if result.stdout:
            return f"**Agent Response**\n\n{result.stdout}"
        else:
            return "Agent executed successfully but returned no output."
            
    except subprocess.TimeoutExpired:
        return "**Error**: Query timed out after 30 seconds."
    except Exception as e:
        return f"**Error**: {str(e)}"

# Routes

@app.get("/api/sessions", response_model=List[ChatSession])
def get_sessions():
    data = load_data()
    # Return list of sessions sorted by creation time (newest first)
    sessions = list(data.values())
    sessions.sort(key=lambda x: x.created_at, reverse=True)
    return sessions

@app.post("/api/sessions", response_model=ChatSession)
def create_session(request: SessionCreateRequest):
    data = load_data()
    session_id = str(uuid.uuid4())
    new_session = ChatSession(
        id=session_id,
        name=request.name,
        created_at=datetime.now().isoformat(),
        messages=[]
    )
    data[session_id] = new_session
    save_data(data)
    return new_session

@app.put("/api/sessions/{session_id}", response_model=ChatSession)
def update_session(session_id: str, request: SessionUpdateRequest):
    data = load_data()
    if session_id not in data:
        raise HTTPException(status_code=404, detail="Session not found")
    
    data[session_id].name = request.name
    save_data(data)
    return data[session_id]

@app.delete("/api/sessions/{session_id}")
def delete_session(session_id: str):
    data = load_data()
    if session_id not in data:
        raise HTTPException(status_code=404, detail="Session not found")
    
    del data[session_id]
    save_data(data)
    return {"message": "Session deleted"}

@app.get("/api/history/{session_id}", response_model=List[ChatMessage])
def get_history(session_id: str):
    data = load_data()
    if session_id not in data:
        raise HTTPException(status_code=404, detail="Session not found")
    return data[session_id].messages

@app.post("/api/chat")
def chat(request: ChatRequest):
    data = load_data()
    if request.session_id not in data:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # 1. Add User Message
    user_msg = ChatMessage(
        role="user",
        content=request.query,
        timestamp=datetime.now().isoformat()
    )
    data[request.session_id].messages.append(user_msg)
    
    # 2. Query the TS Agent
    response_content = query_ts_agent(request.query)
    
    bot_msg = ChatMessage(
        role="bot",
        content=response_content,
        timestamp=datetime.now().isoformat()
    )
    data[request.session_id].messages.append(bot_msg)
    
    save_data(data)
    
    return {
        "response": response_content,
        "history": data[request.session_id].messages
    }

@app.get("/api/config")
def get_config():
    """Return current configuration status"""
    return {
        "use_real_agent": USE_REAL_AGENT,
        "ts_agent_path": TS_AGENT_PATH,
        "agent_available": os.path.exists(os.path.join(TS_AGENT_PATH, "pkg", "cli.py")) if TS_AGENT_PATH else False
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
