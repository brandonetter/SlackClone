import datetime
from app.models import db, Room, User,Type,Room_Member, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_channels():
    current_date = datetime.datetime.now()
    # select a user from the database
    user = User.query.first()
    user2 = User.query.filter(User.username == "marnie").first()

    # select the channel type from the database
    channel = Type.query.filter(Type.type == "CHANNEL").first()
    # create a room
    room = Room(
        name="Demo Room", createdby=user.id,type=channel.id)


    # add the member to the room
    room_member = Room_Member(
        userid=user.id,room=room)
    room_member2 = Room_Member(
        userid=user2.id,room=room)

    db.session.add(room)
    db.session.add(room_member)
    db.session.add(room_member2)
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
        db.session.execute(text("DELETE FROM room_members"))

    db.session.commit()
