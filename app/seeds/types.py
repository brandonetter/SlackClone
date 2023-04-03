import datetime
from app.models import db, Type, environment, SCHEMA
from sqlalchemy.sql import text


def seed_types():
    DM = Type(
        name="DM")
    GROUP_DM = Type(
        name="GROUP_DM")
    CHANNEL = Type(
        name="CHANNEL")

    db.session.add(DM)
    db.session.add(GROUP_DM)
    db.session.add(CHANNEL)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_types():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.types RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM types"))

    db.session.commit()
