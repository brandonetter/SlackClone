from flask import Blueprint, jsonify,session
from flask_login import login_required, current_user
from app.models import User,Room

room_routes = Blueprint('room', __name__)


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


@room_routes.route('/<id>/users')
@login_required
def users(id):
    """
    Query for all users and returns them in a list of user dictionaries
    """
    # return {'null'}
    room = Room.query.get(id)
    return [user.to_dict() for user in room.member_list]
