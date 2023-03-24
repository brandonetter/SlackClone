from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


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
    profileicon = db.Column(db.String(255))
    status = db.Column(db.String(255))
    createdat = db.Column(db.DateTime, nullable=False)
    updatedat = db.Column(db.DateTime, nullable=False)

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
            'email': self.email
        }
