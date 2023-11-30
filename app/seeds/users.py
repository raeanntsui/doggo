# from app.models import db, User, environment, SCHEMA
# from sqlalchemy.sql import text


# # Adds a demo user, you can add other users here if you want
# def seed_users():
#     rae = User(
#         first_name='Rae', last_name='Tsui', username='Rae', email='rae@doggo.io', password='password')
#     maddie = User(
#         first_name='Maddie', last_name='Tsui', username='Maddie', email='maddie@doggo.io', password='password')
#     lily = User(
#         first_name='Lily', last_name='Tsui', username='Lily', email='lily@doggo.io', password='password')
#     daisy = User(
#         first_name='Daisy', last_name='Tsui', username='Daisy', email='daisy@doggo.io', password='password')
    
#     db.session.add(rae)
#     db.session.add(maddie)
#     db.session.add(lily)
#     db.session.add(daisy)
#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_users():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM users"))
        
#     db.session.commit()


from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_users():
    demo = User(
        username='Rae', email='rae@aa.io', password='password', first_name='Rae', last_name='Tsui')
    maddie = User(
        username='Maddie', email='maddie@aa.io', password='password', first_name='Maddie', last_name='Tsui')
    lily = User(
        username='lily', email='lily@aa.io', password='password', first_name='Lily', last_name='Tsui')

    db.session.add(demo)
    db.session.add(maddie)
    db.session.add(lily)
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