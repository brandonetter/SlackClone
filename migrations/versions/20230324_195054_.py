"""empty message

Revision ID: da6db025833f
Revises: ffdc0a98111c
Create Date: 2023-03-24 19:50:54.149311

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'da6db025833f'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('rooms',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('createdby', sa.Integer(), nullable=False),
    sa.Column('type', sa.Integer(), nullable=False),
    sa.Column('createdat', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updatedat', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['createdby'], ['users.id'], ),
    sa.ForeignKeyConstraint(['type'], ['types.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('roomid', sa.Integer(), nullable=False),
    sa.Column('userid', sa.Integer(), nullable=False),
    sa.Column('message', sa.Text(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('createdat', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updatedat', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['roomid'], ['rooms.id'], ),
    sa.ForeignKeyConstraint(['userid'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('room_members',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('roomid', sa.Integer(), nullable=False),
    sa.Column('userid', sa.Integer(), nullable=False),
    sa.Column('createdat', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updatedat', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['roomid'], ['rooms.id'], ),
    sa.ForeignKeyConstraint(['userid'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('firstname', sa.String(length=40), nullable=False))
        batch_op.add_column(sa.Column('lastname', sa.String(length=40), nullable=False))
        batch_op.add_column(sa.Column('hash', sa.String(length=255), nullable=False))
        batch_op.add_column(sa.Column('about', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('profileicon', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('status', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('createdat', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))
        batch_op.add_column(sa.Column('updatedat', sa.DateTime(), nullable=True))
        batch_op.drop_column('hashed_password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('hashed_password', sa.VARCHAR(length=255), nullable=False))
        batch_op.drop_column('updatedat')
        batch_op.drop_column('createdat')
        batch_op.drop_column('status')
        batch_op.drop_column('profileicon')
        batch_op.drop_column('about')
        batch_op.drop_column('hash')
        batch_op.drop_column('lastname')
        batch_op.drop_column('firstname')

    op.drop_table('room_members')
    op.drop_table('messages')
    op.drop_table('rooms')
    op.drop_table('types')
    # ### end Alembic commands ###