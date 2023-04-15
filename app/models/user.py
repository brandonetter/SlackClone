from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

from sqlalchemy.sql import func

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hash = db.Column(db.String(255), nullable=False)
    about = db.Column(db.Text)
    profileicon = db.Column(db.String(4096))
    status = db.Column(db.String(255),default='[Active] Active')
    createdat = db.Column(db.DateTime, server_default=func.now(),default=func.now())
    updatedat = db.Column(db.DateTime, onupdate=func.now(),default=func.now())

    #relationships
    roommemberships = db.relationship('Room_Member', backref='user', lazy=True)
    messages = db.relationship('Message', backref='user', lazy=True)

    @property
    def rooms(self):
        return [roommember.room for roommember in self.roommemberships]

    @property
    def channels(self):
        return [room for room in self.rooms if room.roomtype == 'CHANNEL']

    @property
    def dms(self):
        return [room for room in self.rooms if room.roomtype =='DM']

    @property
    def group_dms(self):
        return [room for room in self.rooms if room.roomtype == 'GROUP_DM']

    @property
    def password(self):
        return self.hash

    @password.setter
    def password(self, password):
        self.hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'status': self.status,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'username': self.username,
            'email': self.email,
            'profileicon': self.profileicon,
        }
