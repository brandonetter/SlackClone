from flask import Blueprint, jsonify,session, request
from flask_login import login_required, current_user

from app.models import User, Room, db, Room_Member, Message
from app.forms import ChannelForm
from datetime import datetime


room_routes = Blueprint('room', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@room_routes.route('/init')
@login_required
def init():
    """
    Query for all rooms and puts the first room in the session
    """

    rooms = current_user.rooms
    print(rooms)
    if(len(rooms) == 0):
        session['room'] = None
        return {'null'}
    else:
        session['room'] = rooms[0].id
        return rooms[0].to_dict()

@room_routes.route('/all')
@login_required
def all():
    """
    Query for all rooms and returns them in a list of room dictionaries
    """

    rooms = current_user.rooms
    if(len(rooms) == 0):
        return {'null'}
    else:
        return [room.to_dict() for room in rooms]



@room_routes.route('/all', methods = ['POST'])
def CreateChannel():
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel = Room(
            name=form.data['name'],
            type=form.data['type'],
            createdby=current_user.id
        )

        channelMember = Room_Member(
            room = channel,
            userid = current_user.id
        )
        message = Message(
            userid=current_user.id,
            message=f"{current_user.username} created the channel",
            room=channel,
            date=datetime.now()
        )
        db.session.add(message)
        db.session.add(channel)
        db.session.add(channelMember)
        db.session.commit()

        return channel.to_dict()
    print(validation_errors_to_error_messages(form.errors))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@room_routes.route('/all/<id>', methods = ['PUT'])
def UpdateChannel(id):
    formContent = request.get_json()
    updateChannel = Room.query.get(id)

    updateChannel.name = formContent["name"]
    updateChannel.type = formContent["type"]
    db.session.add(updateChannel)
    db.session.commit()

    return updateChannel.to_dict()



@room_routes.route('/all/<id>', methods = ['DELETE'])
def ChannelDelete(id):
    print("HEY")
    channel = Room.query.get(id)
    db.session.delete(channel)
    db.session.commit()
    return 'Successfully Deleted', 201

@room_routes.route('/<id>/users')
@login_required
def users(id):
    """
    Query for all users and returns them in a list of user dictionaries
    """
    # return {'null'}
    room = Room.query.get(id)
    return [user.to_dict() for user in room.member_list]
