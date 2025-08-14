
from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_root():
    return templates.TemplateResponse("index.html", {"request": {}})

# uvicorn main:app --reload --host 0.0.0.0 --port 7070
