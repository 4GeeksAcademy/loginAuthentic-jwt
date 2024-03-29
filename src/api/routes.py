"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import hashlib

api = Blueprint("api", __name__)


@api.route("/signup", methods=["POST"])
def create_signup():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    m = hashlib.sha256()
    m.update(bytes(password, "utf-8"))
    passwordhash = m.hexdigest()

    user = User(name=name, email=email, password=passwordhash, is_active=True)

    db.session.add(user)
    db.session.commit()

    return jsonify(user.serialize())


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    m = hashlib.sha256()
    m.update(bytes(password, "utf-8"))
    passwordhash = m.hexdigest()

    user = User.query.filter_by(email=email, password=passwordhash).first()

    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    response_body = {"user": user.serialize(), "access_token": access_token}
    return jsonify(response_body)


@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    email = get_jwt_identity()
    dictionary = {"message": "hello world" + email}
    return jsonify(dictionary)

@api.route("/private", methods=["GET"])
@jwt_required()
def get_validate():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200