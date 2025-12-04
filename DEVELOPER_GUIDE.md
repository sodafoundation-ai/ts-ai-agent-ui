# Developer Guide: Chatbot UI for Time Series AI Agent

This guide explains how to set up, configure, and run the Chatbot UI application. It includes instructions for connecting to the `ts-ai-agent` and Prometheus.

## Prerequisites

*   **Node.js**: v18 or higher (for Frontend)
*   **Python**: v3.10 or higher (for Backend)
*   **ts-ai-agent**: The CLI agent repository (required for real integration)
*   **Prometheus**: Running instance (required by `ts-ai-agent`)

## 1. Installation

### Frontend Setup
1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Backend Setup
1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  (Optional) Create a virtual environment:
    ```bash
    python -m venv venv
    # Windows
    .\venv\Scripts\activate
    # Linux/Mac
    source venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## 2. Configuration

### Connecting to ts-ai-agent

1.  Ensure you have the `ts-ai-agent` repository cloned locally.
2.  In the `backend` directory, create a `.env` file by copying `.env.example`:
    ```bash
    cp .env.example .env
    ```
3.  Edit `.env` to configure the agent:

    ```ini
    # Enable real agent integration
    USE_REAL_AGENT=true

    # Path to your local ts-ai-agent repository
    # Example: C:/Users/username/projects/ts-ai-agent
    TS_AGENT_PATH=../ts-ai-agent
    ```

### Connecting to Prometheus

The `ts-ai-agent` handles the Prometheus connection. Ensure your `ts-ai-agent` is properly configured:
1.  Go to your `ts-ai-agent` directory.
2.  Check `config/prometheus_config.yaml` (or equivalent config file used by the agent).
3.  Ensure the Prometheus URL is correct (e.g., `http://localhost:9090`).

## 3. Running the Application

You need to run both the backend and frontend terminals simultaneously.

### Start Backend
In the `backend` terminal:
```bash
# Run on port 8001 to match frontend configuration
python -m uvicorn main:app --reload --port 8001
```
*The backend API will be available at `http://localhost:8001`.*

### Start Frontend
In the `frontend` terminal:
```bash
npm run dev
```
*The UI will be available at `http://localhost:5176` (check terminal for exact port).*

## 4. Deployment

### Building for Production

To deploy the frontend as static files:
1.  Navigate to `frontend`:
    ```bash
    npm run build
    ```
2.  The build output will be in the `dist` folder.
3.  You can serve these files using any static web server (Nginx, Apache, Vercel, Netlify).

### Production Backend
For production, run the backend using a production server like Gunicorn (Linux) or keep using Uvicorn with workers:
```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8001 --workers 4
```

## Troubleshooting

*   **Backend Connection Failed**: Ensure the backend is running on port **8001**. If you change the port, update `frontend/src/services/api.js`.
*   **Agent Error**: If the bot responds with an error, check the backend terminal logs. Ensure `TS_AGENT_PATH` is correct and `ts-ai-agent` dependencies are installed in your python environment.
