from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def firstName_is_valid(form, field):
    # Checking if first name is valid
    firstName = field.data
    if firstName.isalpha() == False:
        raise ValidationError('First name must only contain letters.')

def lastName_is_valid(form, field):
    # Checking if last name is valid
    lastName = field.data
    if lastName.isalpha() == False:
        raise ValidationError('Last name must only contain letters.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    firstName = StringField('firstName', validators=[DataRequired(),firstName_is_valid])
    lastName = StringField('lastName', validators=[DataRequired(),lastName_is_valid])
