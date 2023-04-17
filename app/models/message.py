
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .user import User
class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    roomid = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('rooms.id')), nullable=False)
    userid = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    message = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    deleted = db.Column(db.Boolean, default=False)
    createdat = db.Column(db.DateTime, server_default=func.now(),default=func.now())
    updatedat = db.Column(db.DateTime, onupdate=func.now(),default=func.now())


    def to_dict(self):
        # convert datetime to string
        date = self.date.strftime("%m/%d/%Y, %H:%M:%S")

        # include the username
        user = User.query.get(self.userid)
        if user is not None:
            username = user.username
            firstname = user.firstname
            lastname = user.lastname
            profileIcon = User.query.get(self.userid).profileicon
        else:
            username = "UnknownUserErrorUnknownUser"
            firstname = "Unknown"
            lastname = "User"
            profileIcon = ""

        # include the user profileIcon


        return {
            "id": self.id,
            "roomid": self.roomid,
            "userid": self.userid,
            "message": self.message,
            "deleted": self.deleted,
            "profileIcon": profileIcon,
            "username": username,
            "firstname": firstname,
            "lastname": lastname,
            "date": date,
        }
