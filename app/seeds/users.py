import datetime
from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    current_date = datetime.datetime.now()
    adminMessage =  User(
        firstname="Server", lastname="Message", username='Admin', email='email' , password='password')
    demo = User(
        firstname="Demouser", lastname="Demolton", username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        firstname="Marnie", lastname="Mcnameface",username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        firstname="Bobbie", lastname="Fischer",username='bobbie', email='bobbie@aa.io', password='password')
    tony = User(
        firstname="Tony", lastname="Stark",username='tony',email='tonystark', password='password')
    george = User(
        firstname="George", lastname="Washington",username='george', email='george', password='password')

    db.session.add(adminMessage)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(tony)
    db.session.add(george)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
