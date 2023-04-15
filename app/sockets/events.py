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
        room = data['channelId']
        chatMessage = data['message']
        print(room)
        # Get the current dateTime
        date = datetime.now()

        # Save message to database
        message = Message(
            userid=current_user.id,
            message=chatMessage,
            roomid=room,
            date=date

        )
        db.session.add(message)
        db.session.commit()
        emit('message-incoming', broadcast=True)


@socketio.on('get-room-messages')
def get_room_messages(last_message_id):

    if current_user.is_authenticated:

        # Get the current room
        room = last_message_id['channelId']
        last_message_id = last_message_id['message']
        print(room)
        message_pull_count = 15
        # Get the messages for the current room
        if last_message_id == "latest":
            # Get the last {message_pull_count} messages for the current room
            messages = Message.query.filter(Message.roomid == room).order_by(Message.id.desc()).limit(message_pull_count).all()
            messages.reverse()
            emit('room-messages', [message.to_dict() for message in messages])
        else:
            # get {message_pull_count} messages before the last message id
            messages = Message.query.filter(Message.roomid == room, Message.id < last_message_id).order_by(Message.id.desc()).limit(message_pull_count).all()
            messages.reverse()
            if len(messages) > 0:
                # if there are messages, send them
                emit('room-messages-append', [message.to_dict() for message in messages])
            else:
                # if there are no messages, send a message saying there are no more messages
                emit('room-messages-append', [{'noMessage': 'No more messages'}])





