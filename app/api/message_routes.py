from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Message, Room,db

message_routes = Blueprint('messages', __name__)




@message_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete(id):
    if current_user.is_authenticated:
        message = Message.query.get(id)
        # set the contents of the message to "deleted" so that it is not
        # displayed in the chat
        message.message = "*message deleted*"
        #update the message in the database
        db.session.add(message)
        db.session.commit()

        return {'message': 'Message deleted'}
    return {'errors': ['Unauthorized']}
