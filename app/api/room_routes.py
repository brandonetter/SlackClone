from flask import Blueprint, jsonify,session
from flask_login import login_required, current_user
from app.models import User

room_routes = Blueprint('room', __name__)


@room_routes.route('/init')
@login_required
def init():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    rooms = current_user.rooms
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
    Query for all users and returns them in a list of user dictionaries
    """
    rooms = current_user.rooms
    if(len(rooms) == 0):
        return {'null'}
    else:
        return [room.to_dict() for room in rooms]
