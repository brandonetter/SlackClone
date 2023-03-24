
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .type import Type
from sqlalchemy.sql import func

class Room(db.Model):
    __tablename__ = 'rooms'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    createdby = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    type = db.Column(db.String(40), db.ForeignKey(add_prefix_for_prod('types.id')), nullable=False)
    createdat = db.Column(db.DateTime, server_default=func.now(),default=func.now())
    updatedat = db.Column(db.DateTime, onupdate=func.now(),default=func.now())
    members = db.relationship('Room_Member', backref='room', lazy=True)


    @property
    def roomtype(self):
        return Type.query.filter(Type.id == self.type).first().type


    @property
    def member_list(self):
        return [roommember.user for roommember in self.members]



