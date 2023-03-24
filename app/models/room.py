
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Room(db.Model):
    __tablename__ = 'rooms'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    createdby = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    type = db.Column(db.String(40), db.ForeignKey(add_prefix_for_prod('types.type')), nullable=False)
    createdat = db.Column(db.DateTime, nullable=False)
    updatedat = db.Column(db.DateTime, nullable=False)

