from .. import socketio
from flask_socketio import emit, join_room, leave_room
from flask import request, session

@socketio.on('connect')
def connect():
    print('Client connected')
