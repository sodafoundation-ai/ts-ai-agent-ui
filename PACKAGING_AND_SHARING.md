# How to Package and Share the Chatbot UI

This document outlines the steps to package the Chatbot UI application for sharing with other developers or users.

## 1. Prepare the Source Code

Before zipping the project, ensure you clean up unnecessary files to keep the package size small.

### Frontend Cleanup
1.  Navigate to the `frontend` directory.
2.  Delete the `node_modules` folder. This will be recreated by the receiver when they run `npm install`.
3.  Delete the `dist` folder (if it exists).

### Backend Cleanup
1.  Navigate to the `backend` directory.
2.  Delete the `__pycache__` folder (and any other `__pycache__` folders inside subdirectories).
3.  Delete any active virtual environment folders (e.g., `venv`, `.venv`).
4.  Delete any local database files if you don't want to share history (e.g., `chat_history.json`).

## 2. Create the Archive

1.  Go to the root directory of the project (e.g., `Demo Chatbot UI`).
2.  Select both `frontend` and `backend` folders.
3.  Create a ZIP archive (e.g., `chatbot-ui-package.zip`).

## 3. What to Include

Ensure the following files are included in your package:

*   **frontend/**
    *   `src/` (All source code)
    *   `public/` (Static assets)
    *   `package.json`
    *   `vite.config.js`
    *   `index.html`
    *   `postcss.config.js`
    *   `tailwind.config.js` (if present)
*   **backend/**
    *   `main.py`
    *   `requirements.txt`
    *   `.env.example`
*   **Documentation**
    *   `DEVELOPER_GUIDE.md` (See below)
    *   `README.md` (Optional)

## 4. Sharing

Send the `chatbot-ui-package.zip` file to the receiver. They will use the **Developer Guide** to set it up.
