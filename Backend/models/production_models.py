from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class MaterialLevel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(50), nullable=False)

class BatchRecipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.String(20), nullable=False)
    ingredients = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(50), nullable=False)

class Alarm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.String(20), nullable=False)
    message = db.Column(db.String(255), nullable=False)

class ProductionOutput(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, unique=True)
    output_in_tons = db.Column(db.Integer, nullable=False)
