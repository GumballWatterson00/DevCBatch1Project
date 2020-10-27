from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.initializers import he_normal
from sklearn import preprocessing
import joblib
import pandas as pd
import math
import json
import time
import requests


app = Flask(__name__)
CORS(app)
model = load_model('lib/model.h5')
model.load_weights('lib/weight.h5')
scaler = joblib.load('lib/scaler.joblib')
df = pd.read_csv('lib/res.csv')


@app.route('/predict', methods=['POST'])
def predict():
    try:    
        data = request.json
        raw_input_data = pd.DataFrame([[0] * 264], columns=df.drop([df.columns[0], 'Giá'], axis=1).columns)
        for area in raw_input_data.columns[2:27]:
            if data['districtId'] == area:
                raw_input_data[area] = 1
        for ward in raw_input_data.columns[27:260]:
            if data['wardId'] == ward:
                raw_input_data[ward] = 1
        for house_type in raw_input_data.columns[260:264]:
            if data['type'] == house_type:
                raw_input_data[house_type] = 1
        raw_input_data['Diện tích'] = math.log1p(data['area'])
        raw_input_data['Số phòng ngủ'] = math.log1p(data['bedroom'])
        prediction = model.predict(scaler.transform(raw_input_data.to_numpy()))
        predicted_price = math.expm1(prediction.flatten()[0])
        response = jsonify({'result': str(predicted_price)})
        return response
    except Exception as error:
        error = str(error)
        return error

@app.route('/search', methods=['POST'])
def search():
    session = requests.session()
    data = request.json
    key = 'AIzaSyCVY1A3TajC-SfNAF5SDt0ra5Cmg554Zhw'
    url_geo = 'https://maps.googleapis.com/maps/api/geocode/json'
    parameters_geo = {'address': data['address'],
                      'key': key}
    response_geo = session.get(url_geo, params=parameters_geo).json()
    lat = str(response_geo['results'][0]['geometry']['location']['lat'])
    lng = str(response_geo['results'][0]['geometry']['location']['lng'])
    LOCATION = lat + ',' + lng
    result = {}
    place = []
    url_nearby = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    parameters_nearby = {"location": LOCATION,
                "radius": 3000,
                "keyword": keyword,
                "key": key}
    response_nearby = session.get(url_nearby, params=parameters_nearby).json()
    place.extend(response_nearby["results"])
    if len(place) >= 1:
        result[keyword] = 'Có'
    else:
        result[keyword] = 'Không có'
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)