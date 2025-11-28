from fastapi import FastAPI 


app = FastAPI(title="Spam Detection API")


@app.get("/")
def home():
    return {"message":"API WORKING"}



@app.post("/check-mail")
def check_mail(mail:str):


