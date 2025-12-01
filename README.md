# JSON Viewer Lite

A simplified web application inspired by enterprise-level session JSON viewers.  
This project demonstrates a clean, professional implementation using **React + MobX (frontend)** and **FastAPI (backend)**.  

The goal is to upload one or two JSON session files and visualize event data in a simple, interactive UI.

---

## Purpose

This project is a lightweight version of a technical JSON Session Viewer used by support engineers.  
It is intentionally kept simple to show strong fundamentals without over-engineering.

The app focuses on:

- Uploading session JSON files  
- Showing the raw JSON in a viewer  
- Extracting basic metadata from the JSON  
- Displaying simple visualizations (scatter plot, heatmap, timeline)  
- Comparing two sessions side-by-side  
- Clean separation between frontend and backend

---

## Tech Stack

### Frontend
- React (Vite recommended)
- MobX (state management)
- Axios (API calls)
- D3.js (scatter + timeline charts)
- heatmap.js (heatmap visualization)
- react-dropzone (drag & drop upload)
- react-json-view-lite (JSON preview)

### Backend
- FastAPI (Python)
- Pydantic
- Uvicorn
- python-multipart (file upload parsing)

---

## Architecture

The project has **two folders only** for simplicity and best practice:
/
├── frontend/ → React + MobX + Visualizations
└── backend/ → FastAPI parsing, validation, and data extraction



---

## Data Flow

1. User uploads JSON files in the React UI.
2. Frontend sends files to FastAPI.
3. FastAPI parses the JSON and extracts:
   - session metadata
   - event positions (x,y,t)
   - event categories
   - timestamps for timeline chart
4. Frontend receives prepared data and visualizes:
   - scatter plot
   - heatmap
   - timeline chart
5. User can optionally upload a second file to compare sessions.

---

## Folder Structure

### Frontend (`/frontend`)
src/
components/
UploadArea.jsx
JsonViewer.jsx
ScatterPlot.jsx
Heatmap.jsx
TimelineChart.jsx
stores/
SessionStore.js
UIStore.js
pages/
Home.jsx
Compare.jsx
utils/
api.js
App.jsx

### Backend (`/backend`)
app/
routers/
session.py
services/
parse_session.py
models/
session.py
main.py

## Notes for Cursor
Cursor should treat this project as a **two-layer architecture**:

- Frontend (React)
- Backend (FastAPI)

No extra API layer should be generated unless explicitly requested.