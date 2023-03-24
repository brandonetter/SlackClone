"""empty message

Revision ID: b52fa56b65bf
Revises: ffdc0a98111c
Create Date: 2023-03-23 20:15:10.506083

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b52fa56b65bf'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('firstName', sa.String(length=40), nullable=False))
        batch_op.add_column(sa.Column('lastName', sa.String(length=40), nullable=False))
        batch_op.add_column(sa.Column('hash', sa.String(length=255), nullable=False))
        batch_op.add_column(sa.Column('about', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('profileIcon', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('status', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('createdAt', sa.DateTime(), nullable=False))
        batch_op.add_column(sa.Column('updatedAt', sa.DateTime(), nullable=False))
        batch_op.drop_column('hashed_password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('hashed_password', sa.VARCHAR(length=255), nullable=False))
        batch_op.drop_column('updatedAt')
        batch_op.drop_column('createdAt')
        batch_op.drop_column('status')
        batch_op.drop_column('profileIcon')
        batch_op.drop_column('about')
        batch_op.drop_column('hash')
        batch_op.drop_column('lastName')
        batch_op.drop_column('firstName')

    # ### end Alembic commands ###