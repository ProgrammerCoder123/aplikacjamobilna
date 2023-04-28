import random
import datetime
from flask import Flask, request
from sqlalchemy import create_engine, text
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import jsonify
from flask_cors import CORS
import requests
from requests_html import HTML
from requests_html import HTMLSession
import json


DATABASE_SCHEMAS = "public"
DATABASE_USERNAME = "postgres"
DATABASE_PASSWORD = "haslo"
DATABASE_SERVER_ADDRESS = "localhost"
DATABASE_SERVER_PORT = 5432
DATABASE_DATABASE_NAME = "apkamobilna"


app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{DATABASE_SERVER_ADDRESS}:{DATABASE_SERVER_PORT}/{DATABASE_DATABASE_NAME}"

#db = SQLAlchemy(app)
#migrate = Migrate(app, db)

engine = create_engine(f"postgresql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{DATABASE_SERVER_ADDRESS}:{DATABASE_SERVER_PORT}/{DATABASE_DATABASE_NAME}")



@app.route('/api/signupuser', methods = ['POST'])
def postSignUpUser():

    givenUserLogin = request.form['user_login']
    givenUserPassword = request.form['user_password']

    with engine.begin() as connection:
        result = connection.execute(text(f"SELECT * FROM user_data WHERE user_login = '{givenUserLogin}'")).all()

        if len(result) > 0:
            response = jsonify ({
                'isRegistered' : "No",
                'reason' : "REASON_USER_LOGIN_TAKEN"
            })
            response.headers.add("Access-Control-Allow-Origin", "*") 
            return response
    

        connection.execute(text(f"INSERT INTO user_data (user_login, user_password) VALUES('{givenUserLogin}', '{givenUserPassword}')"))

        response = jsonify ({
                'isRegistered' : "Yes",
            })
        response.headers.add("Access-Control-Allow-Origin", "*") 
        return response


@app.route('/api/loginuser', methods = ['POST'])
def postLoginUser():

    givenUserLogin = request.form['user_login']
    givenUserPassword = request.form['user_password']

    with engine.begin() as connection:

        result = connection.execute(text(f"SELECT * FROM user_data WHERE user_login = '{givenUserLogin}' AND user_password = '{givenUserPassword}'"))

        if len(result) > 0:
            response = jsonify ({
                'login' : "Yes",
            })
            response.headers.add("Access-Control-Allow-Origin", "*") 
            return response
        
        
        response = jsonify ({
                'login' : "No",
                'reason' : "REASON_USER_LOGIN_INCORRECT_DATA"
            })
        response.headers.add("Access-Control-Allow-Origin", "*") 
        return response



if __name__ == '__main__':
    app.run(debug=False)



