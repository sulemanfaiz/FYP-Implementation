import joblib

# Load all encoders
location_encoder = joblib.load('label_encoder_Location.pkl')
type_encoder = joblib.load('label_encoder_Type.pkl')
furnished_encoder = joblib.load('label_encoder_Furnished.pkl')

print("=== LOCATION ENCODER ===")
print("Available locations:")
for i, location in enumerate(location_encoder.classes_):
    print(f"{i}: {location}")

print("\n=== TYPE ENCODER ===")
print("Available property types:")
for i, prop_type in enumerate(type_encoder.classes_):
    print(f"{i}: {prop_type}")

print("\n=== FURNISHED ENCODER ===")
print("Available furnished options:")
for i, furnished in enumerate(furnished_encoder.classes_):
    print(f"{i}: {furnished}")

print(f"\n=== SUMMARY ===")
print(f"Total locations: {len(location_encoder.classes_)}")
print(f"Total property types: {len(type_encoder.classes_)}")
print(f"Total furnished options: {len(furnished_encoder.classes_)}") 