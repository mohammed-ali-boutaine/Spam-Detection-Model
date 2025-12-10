# Spam Detection Model

A complete machine learning system for email spam detection using Support Vector Machine (SVM) with TF-IDF vectorization. This project includes data preprocessing, model training, a FastAPI backend, and a React frontend.

## Project Overview

This spam detection system classifies emails as spam or ham (legitimate) using natural language processing and machine learning techniques. The model achieves **88.5% accuracy** on the test dataset with a Random Forest classifier.

### Key Features

- ✅ **End-to-end ML pipeline**: Data analysis → Preprocessing → Training → Deployment
- ✅ **High-performance model**: Linear SVM with optimized hyperparameters
- ✅ **REST API**: FastAPI backend for real-time predictions
- ✅ **Modern UI**: React + TypeScript frontend with responsive design
- ✅ **Comprehensive preprocessing**: NLTK-based text cleaning and normalization

## Model Performance

| Metric | Score |
|--------|-------|
| Accuracy | 88.5% |
| Precision | 87.4% |
| Recall | 90.6% |
| F1-Score | 89.0% |

**Model Details:**
- Algorithm: Random Forest Classifier
- Features: TF-IDF vectorization with custom text preprocessing
- Hyperparameters: 
  - n_estimators: 300
  - max_depth: 20
  - max_features: 'log2'
- Training samples: 25,372 emails
- Test samples: 6,344 emails

### Model Comparison Results

| Model | Accuracy | Precision | Recall | F1-Score |
|-------|----------|-----------|--------|----------|
| **Random Forest** ✓ | **88.5%** | **87.4%** | **90.6%** | **89.0%** |
| SVM | 79.9% | 79.2% | 82.0% | 80.6% |
| Logistic Regression | 79.5% | 79.2% | 81.1% | 80.1% |
| Multinomial Naive Bayes | 65.5% | 62.3% | 81.8% | 70.7% |

## Project Structure

```
Spam-Detection-Model/
├── backend/              # FastAPI backend server
│   ├── main.py          # API endpoints
│   ├── model_service.py # Model prediction service
│   └── models/          # Trained model and vectorizer
├── frontend/            # React + TypeScript UI
│   └── src/
│       └── App.tsx      # Main application component
├── notebook/            # Jupyter notebooks
│   ├── 1-analyse.ipynb         # Exploratory data analysis
│   ├── 2-pretraitement.ipynb  # Data preprocessing
│   ├── 3-training.ipynb       # Model training & optimization
│   └── clean.py               # Text cleaning functions
├── data/                # Dataset files
│   ├── emails.csv       # Raw email data
│   └── processed/       # Preprocessed training data
└── requirements.txt     # Python dependencies
```

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 16+
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/mohammed-ali-boutaine/Spam-Detection-Model.git
cd Spam-Detection-Model
```

2. **Set up Python environment:**
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

3. **Download NLTK data:**
```python
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
```

4. **Set up frontend:**
```bash
cd frontend
npm install
```

## Usage

### Running the Backend

```bash
cd backend
uvicorn main:app --reload
```

### Using Jupyter Notebooks

```bash
jupyter notebook
```

Open and run notebooks in order:
1. `1-analyse.ipynb` - Explore the dataset
2. `2-pretraitement.ipynb` - Preprocess and clean data
3. `3-training.ipynb` - Train and optimize the model

## Machine Learning Pipeline

### 1. Data Analysis
- Dataset exploration and visualization
- Label distribution analysis
- Text length statistics
- Word cloud generation for spam vs ham emails

### 2. Text Preprocessing
- Lowercase conversion
- Punctuation and special character removal
- Tokenization using NLTK
- Stop words removal
- Stemming with SnowballStemmer
- TF-IDF vectorization with custom analyzer

### 3. Model Training
- Train-test split (80/20) with stratification
- Multiple model comparison:
  - Multinomial Naive Bayes
  - Logistic Regression
  - Linear SVM
  - Random Forest ✓ (Best performer - 88.5% accuracy)
  - Gradient Boosting
- Hyperparameter tuning with GridSearchCV (5-fold CV)
- Model evaluation with confusion matrix and classification report
- Selected Random Forest with optimized hyperparameters

## Model Details

### Text Preprocessing Pipeline
```python
1. Lowercase conversion
2. Remove punctuation
3. Remove special characters
4. Tokenization
5. Remove stop words
6. Stemming
7. TF-IDF vectorization
```
### Random Forest Hyperparameters
- **n_estimators**: 300 (Number of trees)
- **max_depth**: 20 (Maximum tree depth)
- **max_features**: 'log2' (Features per split)
- **random_state**: 42


## License

This project is open source

## Author

**Mohammed Ali Boutaine**

- GitHub: [@mohammed-ali-boutaine](https://github.com/mohammed-ali-boutaine)
- Repository: [Spam-Detection-Model](https://github.com/mohammed-ali-boutaine/Spam-Detection-Model)
