from .. import socketio
from flask_socketio import emit, join_room, leave_room
from flask import request, session
from flask_login import current_user

@socketio.on('connect')
def connect():
    if current_user.is_authenticated:
        print('Client Authenticated')
    print('Client connected')
