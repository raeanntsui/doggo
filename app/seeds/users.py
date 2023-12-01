from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_users():
    demo = User(
        username='Rae', email='rae@aa.io', password='password', first_name='Rae', last_name='Tsui')
    maddie = User(
        username='Maddie', email='maddie@aa.io', password='password', first_name='Maddie', last_name='Tsui')
    lily = User(
        username='lily', email='lily@aa.io', password='password', first_name='Lily', last_name='Tsui')
    daisy = User(
        username='daisy', email='daisy@aa.io', password='password', first_name='Daisy', last_name='Tsui')
    rose = User(
        username='rose', email='rose@aa.io', password='password', first_name='Rose', last_name='Mary')
    jasmine = User(
        username='jasmine', email='jasmine@aa.io', password='password', first_name='Jasmine', last_name='Jones')
    violet = User(
        username='violet', email='violet@aa.io', password='password', first_name='Violet', last_name='Smith')

    db.session.add(demo)
    db.session.add(maddie)
    db.session.add(lily)
    db.session.add(daisy)
    db.session.add(rose)
    db.session.add(jasmine)
    db.session.add(violet)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()