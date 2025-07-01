from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# Load the model and encoders
rf_model = joblib.load('rent_prediction_rf_model.pkl')
location_encoder = joblib.load('label_encoder_Location.pkl')
type_encoder = joblib.load('label_encoder_Type.pkl')
furnished_encoder = joblib.load('label_encoder_Furnished.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:
        # Extract and validate input fields
        location = data.get('location')
        property_type = data.get('propertyType')
        bedrooms = data.get('bedrooms')
        bathrooms = data.get('bathrooms')
        furnished = data.get('furnished')
        area = data.get('areaSizeUnit')

        # Check for missing fields
        missing = [k for k, v in [
            ("location", location),
            ("propertyType", property_type),
            ("bedrooms", bedrooms),
            ("bathrooms", bathrooms),
            ("furnished", furnished),
            ("areaSizeUnit", area)
        ] if v in [None, "", []]]
        if missing:
            return jsonify({
                'error': f"Missing required fields: {', '.join(missing)}",
                'status': 'error'
            }), 400

        # Validate and encode categorical fields
        if location not in location_encoder.classes_:
            return jsonify({
                'error': f"Location '{location}' not in model training data. Available: {list(location_encoder.classes_)}",
                'status': 'error'
            }), 400
        if property_type not in type_encoder.classes_:
            return jsonify({
                'error': f"Property type '{property_type}' not in model training data. Available: {list(type_encoder.classes_)}",
                'status': 'error'
            }), 400
        if furnished not in furnished_encoder.classes_:
            return jsonify({
                'error': f"Furnished value '{furnished}' not in model training data. Available: {list(furnished_encoder.classes_)}",
                'status': 'error'
            }), 400

        # Convert numerics
        try:
            bedrooms = int(bedrooms)
            bathrooms = int(bathrooms)
            area = float(area)
        except Exception as e:
            return jsonify({
                'error': f"Invalid numeric value: {str(e)}",
                'status': 'error'
            }), 400

        # Encode categorical variables
        location_encoded = location_encoder.transform([location])[0]
        type_encoded = type_encoder.transform([property_type])[0]
        furnished_encoded = furnished_encoder.transform([furnished])[0]

        # Prepare input in the correct order
        input_data = pd.DataFrame({
            'Location_encoded': [location_encoded],
            'Rooms': [bedrooms],
            'Area': [area],
            'Bathrooms': [bathrooms],
            'Type_encoded': [type_encoded],
            'Furnished_encoded': [furnished_encoded]
        })

        # Predict
        predicted_rent = rf_model.predict(input_data)[0]

        return jsonify({
            'predicted_rent': round(predicted_rent, 2),
            'status': 'success'
        })
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug=True)
