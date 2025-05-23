from flask import Blueprint, request, jsonify
from sqlalchemy import text, create_engine
from sqlalchemy.exc import SQLAlchemyError
from flask_cors import CORS
from config import DB_URL 


engine = create_engine(DB_URL)

maintenance_bp = Blueprint('maintenance', __name__)
CORS(maintenance_bp)

@maintenance_bp.route('/api/equipment', methods=['GET'])
def get_equipment():
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT id, name, run_hours, status FROM equipment ORDER BY id DESC"))
            equipment = [dict(row) for row in result]
        return jsonify(equipment)
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500

@maintenance_bp.route('/api/cycle_counters', methods=['GET'])
def get_cycle_counters():
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT id, device, cycles FROM cycle_counters ORDER BY id DESC"))
            counters = [dict(row) for row in result]
        return jsonify(counters)
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500

@maintenance_bp.route('/api/logbook', methods=['POST'])
def add_log():
    data = request.get_json()
    technician_id = data.get('technicianId')
    action_taken = data.get('actionTaken')
    parts_replaced = data.get('partsReplaced')

    if not technician_id or not action_taken:
        return jsonify({'error': 'technicianId and actionTaken are required'}), 400

    try:
        with engine.connect() as conn:
            conn.execute(
                text("""
                    INSERT INTO logbook (technician_id, action_taken, parts_replaced)
                    VALUES (:technician_id, :action_taken, :parts_replaced)
                """),
                {
                    'technician_id': technician_id,
                    'action_taken': action_taken,
                    'parts_replaced': parts_replaced
                }
            )
        conn.commit()
        return jsonify({'message': 'Log saved successfully'}), 201
    except SQLAlchemyError as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
