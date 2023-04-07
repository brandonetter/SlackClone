from .. import socketio
from flask_socketio import emit, join_room, leave_room
from flask import request, session
from app.models import User, Message, db
from flask_login import current_user
from datetime import datetime
@socketio.on('connect')
def connect():
    if current_user.is_authenticated:
        print('Client Authenticated')
    print('Client connected')

@socketio.on('chat-message')
def chat_message(data):
    if current_user.is_authenticated:
        # Get the current room
        room = session.get('room')
        print(room)
        # Get the current dateTime
        date = datetime.now()

        # Save message to database
        message = Message(
            userid=current_user.id,
            message=data,
            roomid=room,
            date=date

        )
        db.session.add(message)
        db.session.commit()
        emit('message-incoming', broadcast=True)
        

@socketio.on('get-room-messages')
def get_room_messages():
    if current_user.is_authenticated:
        # Get the current room
        room = session.get('room')
        # ddprint(room)

        # Get the messages for the current room
        #messages = Message.query.filter(Message.roomid == room).all()

        # Get the last 25 messages for the current room
        messages = Message.query.filter(Message.roomid == room).order_by(Message.id.desc()).limit(25).all()
        messages.reverse()

        #print(messages)
       # emit the messages to the user that requested them
        emit('room-messages', [message.to_dict() for message in messages])
