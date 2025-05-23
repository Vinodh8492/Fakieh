from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

class Order(Base):
    __tablename__ = 'orders'

    id = Column(Integer, primary_key=True, autoincrement=True)
    supplier = Column(String(255), nullable=False)
    material_type = Column(String(255), nullable=False)
    customer = Column(String(255), nullable=False)
    order_id = Column(String(255), nullable=False)
    truck_license_plate = Column(String(255), nullable=False)
    status = Column(String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'supplier': self.supplier,
            'material_type': self.material_type,
            'customer': self.customer,
            'order_id': self.order_id,
            'truck_license_plate': self.truck_license_plate,
            'status': self.status
        }
