from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_ENV_FILE = Path(__file__).resolve().parent.parent / '.env'
if ROOT_ENV_FILE.exists():
    load_dotenv(ROOT_ENV_FILE)

app = Flask(__name__)
CORS(app)

mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017/todos')
client = MongoClient(mongo_uri)
db = client.todos
todos_collection = db.todos

SAMPLE_TODOS = [
    {
        'text': 'Check backend API connection',
        'completed': True,
        'createdAt': datetime.utcnow()
    },
    {
        'text': 'Add a sample todo from the UI',
        'completed': False,
        'createdAt': datetime.utcnow()
    },
    {
        'text': 'Verify completed and pending filters',
        'completed': False,
        'createdAt': datetime.utcnow()
    }
]


def seed_sample_todos():
    if todos_collection.count_documents({}) == 0:
        todos_collection.insert_many(SAMPLE_TODOS)


seed_sample_todos()

@app.route('/todos', methods=['GET'])
def get_todos():
    todos = []
    for todo in todos_collection.find():
        todo['_id'] = str(todo['_id'])
        todos.append(todo)
    return jsonify(todos)

@app.route('/todos', methods=['POST'])
def add_todo():
    data = request.get_json()
    text = data.get('text')
    if not text:
        return jsonify({'error': 'Text is required'}), 400
    todo = {
        'text': text,
        'completed': False,
        'createdAt': datetime.utcnow()
    }
    result = todos_collection.insert_one(todo)
    todo['_id'] = str(result.inserted_id)
    return jsonify(todo), 201

@app.route('/todos/<id>', methods=['PUT'])
def update_todo(id):
    data = request.get_json()
    update_data = {}
    if 'text' in data:
        update_data['text'] = data['text']
    if 'completed' in data:
        update_data['completed'] = data['completed']
    result = todos_collection.update_one({'_id': ObjectId(id)}, {'$set': update_data})
    if result.matched_count == 0:
        return jsonify({'error': 'Todo not found'}), 404
    todo = todos_collection.find_one({'_id': ObjectId(id)})
    todo['_id'] = str(todo['_id'])
    return jsonify(todo)

@app.route('/todos/<id>', methods=['DELETE'])
def delete_todo(id):
    todos_collection.delete_one({'_id': ObjectId(id)})
    return '', 204

if __name__ == '__main__':
    port = int(os.getenv('PORT', '5000'))
    debug = os.getenv('FLASK_DEBUG', 'true').lower() == 'true'
    app.run(host='0.0.0.0', port=port, debug=debug)
