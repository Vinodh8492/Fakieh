from flask import Blueprint, request, jsonify
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from config import DB_URL
from flask_cors import CORS

orders_bp = Blueprint('orders', __name__)
CORS(orders_bp)

engine = create_engine(DB_URL, echo=True)

# Get all orders or filter by status
@orders_bp.route('/api/orders', methods=['GET'])
def get_orders():
    status = request.args.get('status', None)
    try:
        with engine.connect() as conn:
            if status:
                query = text("SELECT * FROM orders WHERE status = :status ORDER BY id DESC")
                result = conn.execute(query, {'status': status})
            else:
                query = text("SELECT * FROM orders ORDER BY id DESC")
                result = conn.execute(query)
            orders = [dict(row) for row in result]
        return jsonify(orders)
    except SQLAlchemyError as e:
        return jsonify({'error': str(e)}), 500

# Create a new order
@orders_bp.route('/api/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    try:
        with engine.begin() as conn:
            query = text("""
                INSERT INTO orders (supplier, material_type, customer, order_id, truck_license_plate, status)
                VALUES (:supplier, :material_type, :customer, :order_id, :truck_license_plate, :status)
            """)
            conn.execute(query, {
                'supplier': data.get('supplier'),
                'material_type': data.get('material_type'),
                'customer': data.get('customer'),
                'order_id': data.get('order_id'),
                'truck_license_plate': data.get('truck_license_plate'),
                'status': data.get('status', 'New Order')
            })
        return jsonify({'message': 'Order created successfully'}), 201
    except SQLAlchemyError as e:
        return jsonify({'error': str(e)}), 500

# Update only the status of an order
@orders_bp.route('/api/orders/<int:order_id>', methods=['PATCH'])
def update_order(order_id):
    data = request.get_json()
    try:
        with engine.begin() as conn:
            query = text("UPDATE orders SET status = :status WHERE id = :order_id")
            conn.execute(query, {
                'status': data.get('status'),
                'order_id': order_id
            })
        return jsonify({'message': 'Order status updated successfully'})
    except SQLAlchemyError as e:
        return jsonify({'error': str(e)}), 500

# Fully update an order (PUT)
@orders_bp.route('/api/orders/<int:order_id>', methods=['PUT'])
def full_update_order(order_id):
    data = request.get_json()
    try:
        with engine.begin() as conn:
            query = text("""
                UPDATE orders 
                SET supplier = :supplier,
                    material_type = :material_type,
                    customer = :customer,
                    order_id = :order_id,
                    truck_license_plate = :truck_license_plate,
                    status = :status
                WHERE id = :order_id_param
            """)
            conn.execute(query, {
                'supplier': data.get('supplier'),
                'material_type': data.get('material_type'),
                'customer': data.get('customer'),
                'order_id': data.get('order_id'),
                'truck_license_plate': data.get('truck_license_plate'),
                'status': data.get('status'),
                'order_id_param': order_id
            })
        return jsonify({'message': 'Order fully updated successfully'})
    except SQLAlchemyError as e:
        return jsonify({'error': str(e)}), 500

# Delete an order
@orders_bp.route('/api/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    try:
        with engine.begin() as conn:
            query = text("DELETE FROM orders WHERE id = :order_id")
            conn.execute(query, {'order_id': order_id})
        return jsonify({'message': 'Order deleted successfully'})
    except SQLAlchemyError as e:
        return jsonify({'error': str(e)}), 500

# Bind RFID to an order
@orders_bp.route('/api/orders/bind-rfid', methods=['POST'])
def bind_rfid_to_order():
    data = request.get_json()
    rfid = data.get('rfid')
    order_id = data.get('order_id')

    if not rfid or not order_id:
        return jsonify({'error': 'Missing RFID or order_id'}), 400

    try:
        with engine.begin() as conn:
            # Check if RFID is already in use
            check_query = text("SELECT COUNT(*) FROM orders WHERE rfid = :rfid")
            result = conn.execute(check_query, {'rfid': rfid}).scalar()
            if result > 0:
                return jsonify({'error': 'RFID already bound to another order'}), 400

            # Bind RFID to the order
            update_query = text("UPDATE orders SET rfid = :rfid WHERE id = :order_id")
            conn.execute(update_query, {'rfid': rfid, 'order_id': order_id})

        return jsonify({'message': 'RFID successfully bound to order'})
    except SQLAlchemyError as e:
        return jsonify({'error': str(e)}), 500
