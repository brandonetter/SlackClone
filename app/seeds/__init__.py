from flask.cli import AppGroup
from .users import seed_users, undo_users
from .types import seed_types, undo_types
from .channels import seed_channels, undo_channels
from app.models.db import db, environment, SCHEMA


from app.models import db, User,Room, environment, SCHEMA
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




@seed_commands.command('test')
def test():
    # get all users
    users = User.query.all()
    print("All users: ",[user.username for user in users])
    # get each user's channels
    for user in users:
        print(user.username,"'s channels:", user.channels)
        # user.channels is a list of channel objects
        # user.dms, and user.group_dms also exist and reflect the DM and Group DM channels the user is in

    # get all rooms
    rooms = Room.query.all()
    print("All rooms: ",[room.name for room in rooms])
    # get each room's members
    for room in rooms:
        print(room.name,"'s members:",[member.username for member in room.member_list])
        # room.member_list is a list of user objects that are members of the room
