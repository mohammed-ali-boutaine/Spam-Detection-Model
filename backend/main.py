from fastapi import FastAPI , HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from model_service import predict

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded


# rate limiter
limiter = Limiter(get_remote_address)


app = FastAPI(
    title="Spam Detection API",
    description="API for detecting spam emails using ML",
)


# Add rate limiter to app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response models
class EmailRequest(BaseModel):
    title: str = Field("", description="Email title/subject")
    message: str = Field(..., min_length=1, description="Email message/body")
    
class PredictionResponse(BaseModel):
    prediction: int
    message: str
    confidence: float = None



@app.get("/")
@limiter.limit("50/minute")
def home():
    return {
        "message": "Spam Detection API is running",

    }



@app.post("/check-mail")
@limiter.limit("50/minute")
def check_mail(request: EmailRequest):
    try:
        # Combine title and message
        combined_text = f"{request.title} {request.message}".strip()
        
        prediction = predict(combined_text)
        message = "spam" if prediction == 1 else "ham"
        
        return {
            "prediction": int(prediction),
            "message": message
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
  