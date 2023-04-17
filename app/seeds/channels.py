import datetime
from app.models import db, Room, User,Type,Room_Member, environment, SCHEMA, Message
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_channels():
    # get current date
    current_date = datetime.datetime.now()
    # get yesterday's date
    yesterday = current_date - datetime.timedelta(days=1)
    yesterday = yesterday - datetime.timedelta(hours=1)
    # get the day before yesterday's date
    day_before_yesterday = current_date - datetime.timedelta(days=2)
    day_before_yesterday = day_before_yesterday + datetime.timedelta(hours=2)

    three_days_ago = current_date - datetime.timedelta(days=3)
    three_days_ago = three_days_ago - datetime.timedelta(hours=3)

    four_days_ago = current_date - datetime.timedelta(days=4)
    four_days_ago = four_days_ago - datetime.timedelta(hours=4)
    five_days_ago = current_date - datetime.timedelta(minutes=20)

    # select a user from the database
    admin = User.query.first()
    user = User.query.filter(User.username == "Demo").first()
    user2 = User.query.filter(User.username == "marnie").first()
    user3 = User.query.filter(User.username == "tony").first()
    user4 = User.query.filter(User.username == "george").first()

    # select the channel type from the database
    channel = Type.query.filter(Type.name == "CHANNEL").first()
    # create a room
    room = Room(
        name="Demo Room", createdby=user.id,type=channel.id)
    room2 = Room(
        name="Chatting", createdby=user.id,type=channel.id)


    # add the member to the room
    room_member = Room_Member(
        user=user,room=room)
    room_member2 = Room_Member(
        user=user2,room=room)
    room_member3 = Room_Member(
        user=user3,room=room)
    room_member4 = Room_Member(
        user=user4,room=room)
    room_member5 = Room_Member(
        user=user,room=room2)
    room_member6 = Room_Member(
        user=user2,room=room2)

    # create messages
    message0 = Message(
        message="Chatting Created", user=admin, room=room2,date=four_days_ago)
    message = Message(
        message="Demo Room Created", user=admin, room=room,date=five_days_ago)
    message2 = Message(
        message="Welcome to the  *Demo Room*", user=user, room=room,date=four_days_ago)
    message3 = Message(
        message="Look at us! Having a conversation!", user=user3, room=room,date=three_days_ago)
    message4 = Message(
        message="I'm the first president of the UNITED STATES OF AMERICA!  **this app is educational**", user=user4, room=room,date=three_days_ago)
    message5 = Message(
        message="I'm the first president of the UNITED STATES OF AMERICA!  **this app is educational**", user=user4, room=room,date=day_before_yesterday)
    message6 = Message(
        message="stop spamming the chat @George ", user=user3, room=room,date=day_before_yesterday)
    message7 = Message(
        message=" @Tony *I CROSSED THE DELAWARE*", user=user4, room=room,date=day_before_yesterday)

    message8 = Message(
        message="This is the demo room? So cool 😂", user=user2, room=room,date=current_date)
    message9 = Message(
        message="Yeah it is! `I'm talking to myself!`", user=user, room=room,date=current_date)
    message10 = Message(
        message="You can scroll up to  *load* more messages", user=user2, room=room,date=current_date)
    message11 = Message(
        message="You can also click on a *channel name* to the left to load that channel", user=user, room=room,date=current_date)
    message12 = Message(
        message="Or click your profile on the right to change your status", user=user2, room=room,date=current_date)
    message13 = Message(
        message="If you want to search for users or messages you can click the search bar at the top", user=user3, room=room,date=current_date)
    message14 = Message(
        message="You can type and @ character to bring up a list of users to mention", user=user2, room=room,date=current_date)
    message15 = Message(
        message="No more tutorial", user=user, room=room,date=current_date)
    message16 = Message(
        message="Now we're just padding the message count", user=user2, room=room,date=current_date)
    message17 = Message(
        message="Really makes the app feel alive", user=user2, room=room,date=current_date)
    message19 = Message(
        message="**WOODEN TEETH**", user=user4, room=room,date=current_date)





    db.session.add(room)
    db.session.add(room2)
    db.session.add(room_member)
    db.session.add(room_member2)
    db.session.add(room_member3)
    db.session.add(room_member4)
    db.session.add(room_member5)
    db.session.add(room_member6)

    db.session.add(message0)
    db.session.add(message)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)
    db.session.add(message7)
    db.session.add(message8)
    db.session.add(message9)
    db.session.add(message10)
    db.session.add(message11)
    db.session.add(message12)
    db.session.add(message13)
    db.session.add(message14)
    db.session.add(message15)
    db.session.add(message16)
    db.session.add(message17)
    # this one crossed a line
    # db.session.add(message18)
    db.session.add(message19)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.rooms RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.room_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM rooms"))
        db.session.execute(text("DELETE FROM messages"))
        db.session.execute(text("DELETE FROM room_members"))

    db.session.commit()
