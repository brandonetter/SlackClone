from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')


class ChannelForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    createdby = StringField('createdby', validators=[DataRequired(), user_exists])
