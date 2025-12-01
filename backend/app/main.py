from fastapi import FastAPI
from app.routers.sessions import router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/')
def root():
    return RedirectResponse(url="/docs")
    
@app.get('/health')
def main_health():
    return {"status": "ok"}



