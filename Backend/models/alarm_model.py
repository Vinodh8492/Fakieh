# models/alarm_model.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()

class Alarm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.String(20), nullable=False)
    equipment = db.Column(db.String(50), nullable=False)
    message = db.Column(db.String(200), nullable=False)
    priority = db.Column(db.String(20), nullable=False)
    area = db.Column(db.String(50), nullable=False)
    acknowledged = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
