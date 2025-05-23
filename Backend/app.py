from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import config # Import the config module

# Importing blueprints
from routes.material_routes import material_bp
from routes.maintenance_routes import maintenance_bp
from routes.orders_routes import orders_bp
from routes.production_routes import production_bp
from routes.alarm_routes import alarm_bp
from routes.rfid_routes import rfid_bp
# Import models to ensure they are registered and recognized (especially if using SQLAlchemy)
from models.material import Material
from models.order_model import Order
from models.alarm_model import Alarm
from models.production_models import MaterialLevel, BatchRecipe, Alarm, ProductionOutput
from models.rfid import db

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = config.DB_URL # Set the database URI from config.py
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Recommended setting

db.init_app(app)

# Register Blueprints
app.register_blueprint(material_bp, url_prefix='/api')
app.register_blueprint(maintenance_bp)
app.register_blueprint(orders_bp)
app.register_blueprint(production_bp)
app.register_blueprint(alarm_bp)
app.register_blueprint(rfid_bp)


if __name__ == '__main__':
    app.run(debug=True)
