from flask import Blueprint, request, jsonify
from flask_cors import CORS
import mysql.connector
from urllib.parse import urlparse
from config import DB_URL  # import DB_URL from config.py

material_bp = Blueprint('material', __name__)
CORS(material_bp)

def get_db_connection():
    url = urlparse(DB_URL)
    return mysql.connector.connect(
        host=url.hostname,
        user=url.username,
        password=url.password,
        database=url.path[1:],  # remove leading '/'
        port=url.port or 3306
    )

# READ all materials
@material_bp.route('/materials', methods=['GET'])
def get_materials():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM materials ORDER BY id DESC")
    materials = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(materials)

# CREATE a material
@material_bp.route('/materials', methods=['POST'])
def add_material():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO materials (name, unit, code, type)
        VALUES (%s, %s, %s, %s)
    """, (data['name'], data['unit'], data['code'], data['type']))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Material added successfully'}), 201

# UPDATE a material by ID
@material_bp.route('/materials/<int:id>', methods=['PUT'])
def update_material(id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE materials SET name=%s, unit=%s, code=%s, type=%s
        WHERE id=%s
    """, (data['name'], data['unit'], data['code'], data['type'], id))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Material updated successfully'})

# DELETE a material by ID
@material_bp.route('/materials/<int:id>', methods=['DELETE'])
def delete_material(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM materials WHERE id=%s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Material deleted successfully'})
