from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

class Equipment(Base):
    __tablename__ = 'equipment'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    run_hours = Column(Integer, nullable=True)
    status = Column(String(50), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'run_hours': self.run_hours,
            'status': self.status,
        }

class CycleCounter(Base):
    __tablename__ = 'cycle_counters'

    id = Column(Integer, primary_key=True, autoincrement=True)
    device = Column(String(255), nullable=False)
    cycles = Column(Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'device': self.device,
            'cycles': self.cycles,
        }

class Logbook(Base):
    __tablename__ = 'logbook'

    id = Column(Integer, primary_key=True, autoincrement=True)
    technician_id = Column(Integer, nullable=False)
    action_taken = Column(Text, nullable=False)
    parts_replaced = Column(Text, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'technician_id': self.technician_id,
            'action_taken': self.action_taken,
            'parts_replaced': self.parts_replaced,
        }
