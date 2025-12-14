import string
import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords 
from nltk.stem import SnowballStemmer


# Initialize tools
stop_words_english = set(stopwords.words("english"))
stemmer = SnowballStemmer("english")


def clean_text(text):
    """Complete text preprocessing pipeline

    - Lowercase 
    - Remove punctuation & special characters
    - tokenize
    - remove stop words
    - stemming
    
    """

    # Convert to string and lowercase
    text = str(text).lower()
    
    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    
    # Remove special characters (keep only letters, numbers, spaces)
    text = re.sub(r'[^a-z0-9\s]', '', text)
    
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Tokenize
    tokens = word_tokenize(text)
    
    # Remove stop words
    tokens = [word for word in tokens if word not in stop_words_english]
    
    # Stemming
    tokens = [stemmer.stem(word) for word in tokens]

    # Join back to string for TF-IDF
    return " ".join(tokens)