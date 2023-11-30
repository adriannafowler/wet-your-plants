from fastapi import APIRouter
from fastapi.responses import HTMLResponse, FileResponse
from pathlib import Path

router = APIRouter()

# Serve the Vite build output (replace 'dashboard' with your actual build output directory)
router.mount("/", StaticFiles(directory=Path("dashboard"), html=True), name="dashboard")

@router.get("/", response_class=HTMLResponse)
async def serve_dashboard():
    # You can include additional logic here if needed
    return FileResponse("dashboard/index.html")
