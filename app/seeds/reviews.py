from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        user_id=4,
        product_id=1,
        rating=5,
        review_description="These were such cute dog tags. I would buy again!",
        review_image="https://i5.walmartimages.com/asr/ddffa161-e7fd-423a-866e-b651fb71ad7b.4b4f1c4b0b1c2b83ddcc2a20a31178a1.jpeg")
    review2 = Review(
        user_id=4,
        product_id=2,
        rating=4,
        review_description="These were such cute dog tags. I would buy again!",
        review_image="https://i5.walmartimages.com/asr/ddffa161-e7fd-423a-866e-b651fb71ad7b.4b4f1c4b0b1c2b83ddcc2a20a31178a1.jpeg")
    review3 = Review(
        user_id=4,
        product_id=3,
        rating=4,
        review_description="These were such cute dog tags. I would buy again!",
        review_image="https://i5.walmartimages.com/asr/ddffa161-e7fd-423a-866e-b651fb71ad7b.4b4f1c4b0b1c2b83ddcc2a20a31178a1.jpeg")
    review4 = Review(
        user_id=5,
        product_id=1,
        rating=5,
        review_description="These were such cute dog tags. I would buy again!",
        review_image="https://i5.walmartimages.com/asr/ddffa161-e7fd-423a-866e-b651fb71ad7b.4b4f1c4b0b1c2b83ddcc2a20a31178a1.jpeg")    
    review5 = Review(
        user_id=6,
        product_id=1,
        rating=3,
        review_description="These were such cute dog tags. I would buy again!",
        review_image="https://i5.walmartimages.com/asr/ddffa161-e7fd-423a-866e-b651fb71ad7b.4b4f1c4b0b1c2b83ddcc2a20a31178a1.jpeg")    
    review6 = Review(
        user_id=7,
        product_id=2,
        rating=3,
        review_description="These were such cute dog tags. I would buy again!",
        review_image="https://i5.walmartimages.com/asr/ddffa161-e7fd-423a-866e-b651fb71ad7b.4b4f1c4b0b1c2b83ddcc2a20a31178a1.jpeg")    
    review7 = Review(
        user_id=7,
        product_id=3,
        rating=4,
        review_description="These were such cute dog tags. I would buy again!",
        review_image="https://i5.walmartimages.com/asr/ddffa161-e7fd-423a-866e-b651fb71ad7b.4b4f1c4b0b1c2b83ddcc2a20a31178a1.jpeg")    
    
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()