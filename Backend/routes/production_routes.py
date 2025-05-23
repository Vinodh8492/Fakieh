from flask import Blueprint, jsonify
from models.production_models import db, MaterialLevel, BatchRecipe, Alarm, ProductionOutput
from datetime import date

production_bp = Blueprint('production', __name__)

@production_bp.route('/materials', methods=['GET'])
def get_material_levels():
    materials = MaterialLevel.query.all()
    return jsonify([{
        "name": m.name,
        "level": m.level,
        "status": m.status
    } for m in materials])

@production_bp.route('/batches', methods=['GET'])
def get_batch_recipes():
    batches = BatchRecipe.query.all()
    return jsonify([{
        "id": b.recipe_id,
        "ingredients": b.ingredients,
        "status": b.status
    } for b in batches])

@production_bp.route('/alarms', methods=['GET'])
def get_alarms():
    alarms = Alarm.query.order_by(Alarm.id.desc()).limit(20).all()
    return jsonify([{
        "time": a.time,
        "message": a.message
    } for a in alarms])

@production_bp.route('/output', methods=['GET'])
def get_today_output():
    today = date.today()
    output = ProductionOutput.query.filter_by(date=today).first()
    return jsonify({
        "date": str(today),
        "output_in_tons": output.output_in_tons if output else 0
    })
