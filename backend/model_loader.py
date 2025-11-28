
import joblib 

model = joblib.load("models/best_model.pkl")

vectorizer = joblib.load("models/vectorizer.pkl")


text = ["Nah I don't think he goes to usf, he lives around here though"]



# transform text → vector
text_vec = vectorizer.transform(text)


# get prediction
prediction = model.predict(text_vec)[0]

print("Prediction:", prediction)
