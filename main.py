
from fastapi import FastAPI, APIRouter
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()
router = APIRouter()

templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")


@router.get("/")
def read_root():
    return templates.TemplateResponse("index.html", {"request": {}})


# uvicorn main:app --reload --host 0.0.0.0 --port 7070
app.include_router(router, prefix="/timer")
