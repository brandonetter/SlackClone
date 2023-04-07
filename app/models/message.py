
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
    createdat = db.Column(db.DateTime, server_default=func.now(),default=func.now())
    updatedat = db.Column(db.DateTime, onupdate=func.now(),default=func.now())


    def to_dict(self):
        # convert datetime to string
        date = self.date.strftime("%m/%d/%Y, %H:%M:%S")
        
        # include the username
        user = User.query.get(self.userid)
        username = user.username
        firstname = user.firstname
        lastname = user.lastname
      
        # include the user profileIcon
        self.profileIcon = User.query.get(self.userid).profileicon

        return {
            "id": self.id,
            "roomid": self.roomid,
            "userid": self.userid,
            "message": self.message,
            "profileIcon": self.profileIcon,
            "username": username,
            "firstname": firstname,
            "lastname": lastname,
            "date": date,
        }