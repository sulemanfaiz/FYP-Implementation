import joblib

# Load the location encoder
location_encoder = joblib.load('label_encoder_Location.pkl')

# Print available locations
print("Available locations in the trained model:")
for i, location in enumerate(location_encoder.classes_):
    print(f"{i}: {location}")

print(f"\nTotal locations: {len(location_encoder.classes_)}") 