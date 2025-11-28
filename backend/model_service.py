
import joblib

# Exception for model loading errors
class ModelLoadError(Exception):
    pass

model = joblib.load("models/best_model.pkl")

vectorizer = joblib.load("models/vectorizer.pkl")



def predict(text:str) -> int :

    """
    Predict if an email is spam or ham.
    
    Args:
        text: Email text to classify
        
    Returns:
        int: 1 for spam, 0 for ham
    """

    
    if not isinstance(text, str):
        raise ValueError("Input must be a string")
    
    if not text.strip():
        raise ValueError("Input text cannot be empty")
    
    # Transform text to vector (must be in a list)
    text_vec = vectorizer.transform([text])
    
    # Get prediction
    prediction = model.predict(text_vec)[0]
    
    return int(prediction)


