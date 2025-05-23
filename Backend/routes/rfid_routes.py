from flask import Blueprint, request, jsonify
from models.rfid import db, RFIDBinding

rfid_bp = Blueprint('rfid', __name__, url_prefix='/api/rfid')

@rfid_bp.route('/bind', methods=['POST'])
def bind_rfid():
    data = request.get_json()
    truck_id = data.get('truckId')
    material = data.get('material')
    rfid_tag = data.get('rfid')

    if not all([truck_id, material, rfid_tag]):
        return jsonify({'error': 'Missing required fields'}), 400

    existing_binding = RFIDBinding.query.filter_by(rfid_tag=rfid_tag).first()
    if existing_binding:
        return jsonify({'error': 'RFID tag already bound'}), 400

    new_binding = RFIDBinding(truck_id=truck_id, material=material, rfid_tag=rfid_tag)
    db.session.add(new_binding)
    db.session.commit()

    return jsonify({'message': 'RFID tag bound successfully'}), 201

@rfid_bp.route('/log', methods=['GET'])
def get_bindings():
    bindings = RFIDBinding.query.order_by(RFIDBinding.created_at.desc()).limit(50).all()
    result = [
        {
            'truckId': b.truck_id,
            'material': b.material,
            'rfid': b.rfid_tag,
            'timestamp': b.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
        for b in bindings
    ]
    return jsonify(result), 200

@rfid_bp.route('/check/<string:rfid_tag>', methods=['GET'])
def check_rfid_exists(rfid_tag):
    exists = RFIDBinding.query.filter_by(rfid_tag=rfid_tag).first() is not None
    return jsonify({'exists': exists}), 200
