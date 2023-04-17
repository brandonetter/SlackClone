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

@room_routes.route('/dm/', methods = ['POST'])
@login_required
def dm():
    other_user = request.get_json()
    other_user = User.query.get(other_user['user'])
    if(other_user == None):
        return {'error': 'User does not exist'}
    else:

        # create a new room with the name of the two users in alphabetical order
        name = [current_user.username, other_user.username]
        name.sort()
        print (f"{name[0]} {name[1]}")
        room = Room.query.filter(Room.type == 1).filter(Room.name == f"{name[0]} {name[1]}").first()
        if(room == None):
            room = Room(
                name=f"{current_user.username} {other_user.username}",
                type=1,
                createdby=current_user.id
            )
            db.session.add(room)
            db.session.commit()
            roomMember = Room_Member(
                room = room,
                userid = current_user.id
            )
            roomMember2 = Room_Member(
                room = room,
                userid = other_user.id
            )
            message = Message(
                userid=1,
                message=f"{current_user.username} created the channel",
                room=room,
                date=datetime.now()
            )
            db.session.add(message)
            db.session.add(roomMember)
            db.session.add(roomMember2)
            db.session.commit()

        return room.to_dict()


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
            userid=1,
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
    channel = Room.query.get(id)
    db.session.delete(channel)
    db.session.commit()
    return channel.to_dict()


@room_routes.route('/group/all',methods = ['POST'])
@login_required
def allGroups():
    # # get all the rooms that the user is a member of
    rooms = current_user.rooms
    # filter the rooms to only get the group rooms
    groups = [room for room in rooms if room.type == 2]
    if(len(groups) == 0):
        return {'error':'null'}
    else:
        return [group.to_dict() for group in groups]

@room_routes.route('/group/', methods = ['POST'])
@login_required
def CreateGroup():
    # get the list of users from the request
    myId = current_user.id
    users = request.get_json()
    # create an array containing the names of each user
    name_array =  [current_user.username]
    for user in users['users']:
        name_array.append(user['username'])
    # sort the array alphabetically
    name_array.sort()
    print (name_array)

    # create a string of the names separated by commas
    named = ''
    for name in name_array:
        named += name + ','
    named = named[:-1]

    # check if the group already exists by name and type
    group = Room.query.filter_by(name=named).filter_by(type=2).first()
    if group:
        return {'error': 'Group already exists'}


    # create a new room
    group = Room(
        name=named,
        type=2,
        createdby=myId
    )
    db.session.add(group)

    # create the intro message for the room
    message = Message(
            userid=1,
            message=f"{current_user.username} created the group DM",
            room=group,
            date=datetime.now()
        )
    db.session.add(message)

    # add the current user to the room
    groupMember_me = Room_Member(
        room = group,
        user = current_user
    )
    # add the other users to the room
    for user in users['users']:
        groupMember = Room_Member(
            room = group,
            userid = user['id']
        )
        db.session.add(groupMember)

    db.session.add(groupMember_me)
    db.session.commit()
    return group.to_dict()

@room_routes.route('/<id>/users')
@login_required
def users(id):
    """
    Query for all users and returns them in a list of user dictionaries
    """
    # return {'null'}
    room = Room.query.get(id)
    if room is None:
        return {'null'}
    return [user.to_dict() for user in room.member_list]
