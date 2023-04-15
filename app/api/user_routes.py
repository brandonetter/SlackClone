from flask import Blueprint, jsonify,request,send_file
from flask_login import login_required, current_user
from app.models import User,db
import base64
import os
user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/status',methods=['POST'])
@login_required
def status():
    #get the body of the request
    status = request.get_json()
    user = User.query.get(current_user.id)
    user.status = status['status']
    db.session.add(user)
    db.session.commit()
    return {'status': 'Status updated'}

@user_routes.route('/profileimage/<int:id>')
@login_required
def profileimage(id):
    user = User.query.get(id)

    img_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'static/images')
    print(user.profileicon)
    if user.profileicon == None:
        img_path = os.path.join(img_dir, 'defaultIcon.png')
    else:
        img_path = os.path.join(img_dir, user.profileicon)
    return send_file(img_path, mimetype='image/png')

@user_routes.route('/profileimage/upload/',methods=['POST'])
@login_required
def upload():
    print("heyyy")
    # get the image from the request

    image = request.files['file']


    # check if the image is a png or jpg
    if not (image.filename.endswith('.png') or image.filename.endswith('.jpg')) or image.filename.endswith('.gif'):
        return {'errors': 'Image must be a png or jpg or gif'}, 401

    # check if the image is too big
    if image.content_length > 2000000:
        return {'errors': 'Image must be less than 2MB'}, 401

    # ge the file extension
    ext = image.filename.split('.')[-1]

    user = User.query.get(current_user.id)

    imagename =  user.username + str(user.id) + '.' + ext
    user.profileicon = imagename
    db.session.add(user)
    db.session.commit()

    # save image to this folder
    image.save(os.path.join('app/static/images',imagename))

    return {'image': 'Image updated'}
