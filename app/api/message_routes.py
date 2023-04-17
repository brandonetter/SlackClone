from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Message, Room,db

message_routes = Blueprint('messages', __name__)




@message_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete(id):
    if current_user.is_authenticated:
        message = Message.query.get(id)
        # check if the message belongs to the current user
        if message.userid != current_user.id:
            return {'errors': ['Unauthorized']}

        # set the contents of the message to "deleted" so that it is not
        # displayed in the chat
        message.message = "*message deleted*"
        message.deleted = True
        #update the message in the database
        db.session.add(message)
        db.session.commit()

        return {'message': 'Message deleted'}
    return {'errors': ['Unauthorized']}

@message_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit(id):
    #get the body of the request
    message_content = request.get_json()

    if current_user.is_authenticated:
        message = Message.query.get(id)
        if message.userid != current_user.id:
            return {'errors': ['Unauthorized']}

        # set the contents of the message to "deleted" so that it is not
        # displayed in the chat
        message.message = message_content['message']
        #update the message in the database
        db.session.add(message)
        db.session.commit()

        return {'message': 'Message edited'}
    return {'errors': ['Unauthorized']}
