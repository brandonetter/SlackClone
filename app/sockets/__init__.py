from flask import Blueprint

socketBluePrint = Blueprint('socket', __name__)
from . import events
