from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class RFIDBinding(db.Model):
    __tablename__ = 'rfid_bindings'
    id = db.Column(db.Integer, primary_key=True)
    truck_id = db.Column(db.String(50), nullable=False)
    material = db.Column(db.String(100), nullable=False)
    rfid_tag = db.Column(db.String(100), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
