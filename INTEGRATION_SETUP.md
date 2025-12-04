# Integration Setup for ts-ai-agent (dev branch)

## Quick Start (Mock Mode - Default)

The application works in **mock mode** by default, so you can test the UI without setting up the full agent.

1. Start backend: `cd backend && python -m uvicorn main:app --reload --port 8000`
2. Start frontend: `cd frontend && npm run dev`
3. Open browser to the frontend URL (usually http://localhost:5173)

## Real Agent Integration

To connect to the actual ts-ai-agent:

### 1. Clone the Repository

```bash
cd "c:\skdworking\code workspace\SODA TS AI AGENT"
git clone -b dev https://github.com/rohithvaidya/ts-ai-agent.git
cd ts-ai-agent
```

### 2. Setup the Agent

```bash
python -m venv .venv
.venv\Scripts\activate  # On Windows
pip install -r requirements.txt
```

### 3. Configure Prerequisites

**Prometheus**: 
- Install and run Prometheus
- Update `config/prometheus_config.yaml` with your Prometheus endpoint

**Ollama**:
- Install Ollama from https://ollama.ai
- Run: `ollama serve`
- Pull a model: `ollama pull llama2` (or your preferred model)
- Update `config/ollama_config.yaml` with the Ollama endpoint

### 4. Onboard Metrics (Optional but Recommended)

```bash
# Get metrics from your Prometheus
curl <prometheus_url>/api/v1/label/__name__/values > config/metrics.txt

# Create embeddings
python pkg/copilot/DP_logic/DynamicPrompt/onboarding_cli.py
```

### 5. Configure Backend Environment

In the `backend/` directory, create a `.env` file or set environment variables:

```bash
# Windows PowerShell
$env:TS_AGENT_PATH = "c:\skdworking\code workspace\SODA TS AI AGENT\ts-ai-agent"
$env:USE_REAL_AGENT = "true"

# Or create a .env file in backend/:
TS_AGENT_PATH=c:\skdworking\code workspace\SODA TS AI AGENT\ts-ai-agent
USE_REAL_AGENT=true
```

**Note**: To use `.env` file, install `python-dotenv`:
```bash
pip install python-dotenv
```

And add to `main.py` at the top:
```python
from dotenv import load_dotenv
load_dotenv()
```

### 6. Restart Backend

```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

### 7. Test

Open the frontend and ask questions like:
- "Which cluster has the highest CPU utilization?"
- "Show me memory usage trends"
- "What are the top 5 metrics by value?"

## Troubleshooting

### Check Configuration Status

Visit: http://localhost:8000/api/config

This shows:
- `use_real_agent`: Whether real agent mode is enabled
- `ts_agent_path`: Path to the agent repository
- `agent_available`: Whether the agent CLI is found

### Common Issues

1. **"Agent not found"**: Check TS_AGENT_PATH is correct
2. **"Prometheus connection failed"**: Ensure Prometheus is running and config is correct
3. **"Ollama error"**: Ensure Ollama is running with `ollama serve` and a model is pulled
4. **Timeout errors**: Increase timeout in `main.py` if queries take too long

## Architecture

```
Frontend (React) → Backend (FastAPI) → ts-ai-agent CLI → Prometheus/Ollama
                ↓
         chat_history.json
```

The backend:
1. Receives queries from the frontend
2. Creates a temporary YAML query file
3. Executes the ts-ai-agent CLI via subprocess
4. Returns the formatted response to the frontend
5. Stores all conversation history
