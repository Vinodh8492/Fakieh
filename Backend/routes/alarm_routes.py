# routes/alarm_routes.py
from flask import Blueprint, request, jsonify
from models.alarm_model import db, Alarm

alarm_bp = Blueprint('alarm_bp', __name__, url_prefix='/alarms')

@alarm_bp.route('/', methods=['GET'])
def get_alarms():
    alarms = Alarm.query.all()
    return jsonify([{
        "id": a.id,
        "time": a.time,
        "equipment": a.equipment,
        "message": a.message,
        "priority": a.priority,
        "area": a.area,
        "acknowledged": a.acknowledged
    } for a in alarms])

@alarm_bp.route('/', methods=['POST'])
def create_alarm():
    data = request.json
    new_alarm = Alarm(
        time=data['time'],
        equipment=data['equipment'],
        message=data['message'],
        priority=data['priority'],
        area=data['area'],
        acknowledged=data.get('acknowledged', False)
    )
    db.session.add(new_alarm)
    db.session.commit()
    return jsonify({"message": "Alarm created"}), 201

@alarm_bp.route('/<int:alarm_id>/acknowledge', methods=['PUT'])
def acknowledge_alarm(alarm_id):
    alarm = Alarm.query.get(alarm_id)
    if not alarm:
        return jsonify({"error": "Alarm not found"}), 404
    alarm.acknowledged = True
    db.session.commit()
    return jsonify({"message": "Alarm acknowledged"})
