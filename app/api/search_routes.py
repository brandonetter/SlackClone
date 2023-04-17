from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from app.models import User,db,Message

search_routes = Blueprint('search', __name__)


@search_routes.route('/',methods=['POST'])
@login_required
def search():
    print('search')
    searches = request.get_json()
    search = searches['search']
    type = searches['type']
    if(type == 'people'):
        # check if the search is a username or a first name or a last name
        users = User.query.filter(User.username.ilike(f'%{search}%')).all()

        users2 = User.query.filter(User.firstname.ilike(f'%{search}%')).all()

        users3 = User.query.filter(User.lastname.ilike(f'%{search}%')).all()
        # add the users to the list
        users.extend(users2)
        users.extend(users3)
        # remove duplicates
        users = list(dict.fromkeys(users))

        print(users)
        return {'users': [user.to_dict() for user in users]}
    elif(type == 'messages'):
        messages = Message.query.filter(Message.message.ilike(f'%{search}%')).all()
        return {'messages': [message.to_dict() for message in messages]}
    return {'errors': 'No results found'}

