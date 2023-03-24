from flask.cli import AppGroup
from .users import seed_users, undo_users
from .types import seed_types, undo_types
from .channels import seed_channels, undo_channels
from app.models.db import db, environment, SCHEMA

from app.models import db, User, environment, SCHEMA
# Creates a seed group to hold our commands
# So we can type `flask seed --help`


seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_types()
        undo_channels()
    seed_users()
    seed_types()
    seed_channels()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_types()
    undo_channels()

    # Add other undo functions here
@seed_commands.command('test')
def test():
    # get all users
    users = User.query.all()
    print(users)
    # get each user's rooms
    for user in users:
        print(user.roommemberships)
        # get the room name for each room
        for room in user.roommemberships:
            print("START")
            print(room.room.name)
            # get the room type for each room
            print(room.room.type)
            # get the room members for each room
            print(room.room.members)
            print("END")
