from flask import Blueprint, jsonify,session, request
from flask_login import login_required, current_user
from app.models import User, Room, db
from app.forms import ChannelForm


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
        db.session.add(channel)
        db.session.commit()

        return channel.to_dict()
    print(validation_errors_to_error_messages(form.errors))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
