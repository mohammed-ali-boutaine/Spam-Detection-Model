
import joblib

import nltk


# nltk data check
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('punkt', quiet=True)
    nltk.download('stopwords', quiet=True)



# Exception for model loading errors
class ModelLoadError(Exception):
    pass


try:
    model = joblib.load("models/best_model.pkl")
    vectorizer = joblib.load("models/vectorizer.pkl")
    print("✓ Models loaded successfully")
except FileNotFoundError:
    raise ModelLoadError("Model files not found. Please train the model first.")
except Exception as e:
    raise ModelLoadError(f"Failed to load models: {str(e)}")



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


