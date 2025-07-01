import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import matplotlib.pyplot as plt
import seaborn as sns

def train_rent_prediction_model():
    print("=== LOADING DATASET ===")
    
    # Load the dataset
    df = pd.read_csv('complete_rent_data_islamabad.csv')
    
    print("Dataset shape:", df.shape)
    print("\nFirst 5 rows:")
    print(df.head())
    print("\nData types:")
    print(df.dtypes)
    print("\nMissing values:")
    print(df.isnull().sum())
    
    # Data exploration
    print("\n=== DATA EXPLORATION ===")
    print("Unique Locations:", sorted(df['Location'].unique()))
    print("Unique Types:", sorted(df['Type'].unique()))
    print("Unique Furnished:", sorted(df['Furnished'].unique()))
    print(f"Rooms range: {df['Rooms'].min()} to {df['Rooms'].max()}")
    print(f"Area range: {df['Area'].min()} to {df['Area'].max()}")
    print(f"Bathrooms range: {df['Bathrooms'].min()} to {df['Bathrooms'].max()}")
    print(f"Rent range: {df['Rent'].min()} to {df['Rent'].max()}")
    
    # Prepare the data
    print("\n=== PREPARING DATA ===")
    
    # Create label encoders for categorical variables
    location_encoder = LabelEncoder()
    type_encoder = LabelEncoder()
    furnished_encoder = LabelEncoder()
    
    # Fit and transform categorical variables
    df['Location_encoded'] = location_encoder.fit_transform(df['Location'])
    df['Type_encoded'] = type_encoder.fit_transform(df['Type'])
    df['Furnished_encoded'] = furnished_encoder.fit_transform(df['Furnished'])
    
    # Create feature matrix X and target variable y
    X = df[['Location_encoded', 'Rooms', 'Area', 'Bathrooms', 'Type_encoded', 'Furnished_encoded']]
    y = df['Rent']
    
    print("Feature matrix shape:", X.shape)
    print("Target variable shape:", y.shape)
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print(f"Training set size: {X_train.shape[0]}")
    print(f"Test set size: {X_test.shape[0]}")
    
    # Train Random Forest model
    print("\n=== TRAINING RANDOM FOREST MODEL ===")
    
    # Initialize the model
    rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    
    # Train the model
    rf_model.fit(X_train, y_train)
    
    # Make predictions
    y_pred_train = rf_model.predict(X_train)
    y_pred_test = rf_model.predict(X_test)
    
    # Evaluate the model
    print("\n=== MODEL EVALUATION ===")
    
    # Training set metrics
    train_mae = mean_absolute_error(y_train, y_pred_train)
    train_mse = mean_squared_error(y_train, y_pred_train)
    train_rmse = np.sqrt(train_mse)
    train_r2 = r2_score(y_train, y_pred_train)
    
    print("Training Set Metrics:")
    print(f"MAE: {train_mae:.2f}")
    print(f"MSE: {train_mse:.2f}")
    print(f"RMSE: {train_rmse:.2f}")
    print(f"R² Score: {train_r2:.4f}")
    
    # Test set metrics
    test_mae = mean_absolute_error(y_test, y_pred_test)
    test_mse = mean_squared_error(y_test, y_pred_test)
    test_rmse = np.sqrt(test_mse)
    test_r2 = r2_score(y_test, y_pred_test)
    
    print("\nTest Set Metrics:")
    print(f"MAE: {test_mae:.2f}")
    print(f"MSE: {test_mse:.2f}")
    print(f"RMSE: {test_rmse:.2f}")
    print(f"R² Score: {test_r2:.4f}")
    
    # Cross-validation
    cv_scores = cross_val_score(rf_model, X, y, cv=5, scoring='r2')
    print(f"\nCross-validation R² scores: {cv_scores}")
    print(f"Mean CV R² score: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")
    
    # Feature importance
    feature_importance = pd.DataFrame({
        'feature': ['Location', 'Rooms', 'Area', 'Bathrooms', 'Type', 'Furnished'],
        'importance': rf_model.feature_importances_
    })
    feature_importance = feature_importance.sort_values('importance', ascending=False)
    
    print("\nFeature Importance:")
    print(feature_importance)
    
    # Hyperparameter tuning
    print("\n=== HYPERPARAMETER TUNING ===")
    
    # Define parameter grid
    param_grid = {
        'n_estimators': [50, 100, 200],
        'max_depth': [10, 20, 30, None],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4]
    }
    
    # Grid search
    grid_search = GridSearchCV(
        RandomForestRegressor(random_state=42),
        param_grid,
        cv=5,
        scoring='r2',
        n_jobs=-1,
        verbose=1
    )
    
    grid_search.fit(X_train, y_train)
    
    print(f"Best parameters: {grid_search.best_params_}")
    print(f"Best cross-validation score: {grid_search.best_score_:.4f}")
    
    # Use the best model
    best_model = grid_search.best_estimator_
    y_pred_best = best_model.predict(X_test)
    best_r2 = r2_score(y_test, y_pred_best)
    print(f"Best model R² score on test set: {best_r2:.4f}")
    
    # Save the model and encoders
    print("\n=== SAVING MODEL ===")
    
    # Save the best model
    joblib.dump(best_model, 'rent_prediction_rf_model.pkl')
    
    # Save the encoders
    joblib.dump(location_encoder, 'label_encoder_Location.pkl')
    joblib.dump(type_encoder, 'label_encoder_Type.pkl')
    joblib.dump(furnished_encoder, 'label_encoder_Furnished.pkl')
    
    print("Model and encoders saved successfully!")
    
    # Test the model with sample data
    print("\n=== TESTING MODEL ===")
    
    # Sample prediction
    sample_data = pd.DataFrame({
        'Location_encoded': [location_encoder.transform(['F-7'])[0]],
        'Rooms': [3],
        'Area': [1500],
        'Bathrooms': [2],
        'Type_encoded': [type_encoder.transform(['Full House'])[0]],
        'Furnished_encoded': [furnished_encoder.transform(['Yes'])[0]]
    })
    
    prediction = best_model.predict(sample_data)[0]
    print(f"Sample prediction for F-7, 3 rooms, 1500 area, 2 bathrooms, Full House, Furnished: Rs. {prediction:.2f}")
    
    # Print encoder mappings for reference
    print("\n=== ENCODER MAPPINGS ===")
    print("Location mappings:")
    for i, location in enumerate(location_encoder.classes_):
        print(f"  {i}: {location}")
    
    print("\nType mappings:")
    for i, prop_type in enumerate(type_encoder.classes_):
        print(f"  {i}: {prop_type}")
    
    print("\nFurnished mappings:")
    for i, furnished in enumerate(furnished_encoder.classes_):
        print(f"  {i}: {furnished}")
    
    return best_model, location_encoder, type_encoder, furnished_encoder

if __name__ == "__main__":
    train_rent_prediction_model() 