from flask import Blueprint, jsonify

from .extensions import mongo
main = Blueprint('main', __name__)

@main.route('/')
def index():
    user_collection = mongo.db.test.users
    users = user_collection.find()
    user_list = [user for user in users]
    return jsonify(user_list)
