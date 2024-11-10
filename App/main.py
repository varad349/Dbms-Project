from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from App.database import engine
from App import models
from App.Routes import user, auth,bookManagement,library,libLog #, resume, resume_enhancer, recommend
app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify allowed origins here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)


@app.get("/")
async def root():
    print("Hello world")

def include_routers():
    app.include_router(user.router)
    app.include_router(auth.router)
    app.include_router(bookManagement.router)
    app.include_router(library.router)
    app.include_router(libLog.router)


include_routers()
