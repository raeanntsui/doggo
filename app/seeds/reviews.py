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
        rating=3,
        review_description="These were only ok",
        review_image="https://ae01.alicdn.com/kf/Hde517120e64747529b8abbf127d9b5e0u/Winter-Cat-Dog-Hoodie-Clothes-Cute-Pet-Costume-for-Small-Dogs-Puppy-Yorkshire-Sweatshirt-Mascotas-Clothing.jpg")
    review3 = Review(
        user_id=4,
        product_id=3,
        rating=4,
        review_description="I liked it",
        review_image="https://i5.walmartimages.com/asr/ddffa161-e7fd-423a-866e-b651fb71ad7b.4b4f1c4b0b1c2b83ddcc2a20a31178a1.jpeg")
    review4 = Review(
        user_id=5,
        product_id=1,
        rating=5,
        review_description="I think these are some pretty rad hats for your dog!",
        review_image="https://i.etsystatic.com/10819873/r/il/5452b6/3900731377/il_570xN.3900731377_57vj.jpg")    
    review5 = Review(
        user_id=6,
        product_id=1,
        rating=3,
        review_description="Yeehaw some cowboy hats for your pupper!",
        review_image="https://i5.walmartimages.com/asr/d0118415-6687-4188-ad4b-1f36bdd9fa56.fc074c4e80059f46f89858b6f12d845a.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF")    
    review6 = Review(
        user_id=7,
        product_id=2,
        rating=3,
        review_description="Nice hoodie, would buy again.",
        review_image="data:image/jpeg;base64,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")    
    review7 = Review(
        user_id=7,
        product_id=3,
        rating=4,
        review_description="Cute boots for your doggo",
        review_image="https://www.hepper.com/wp-content/uploads/2023/05/dog-standing-outdoors-in-blue-boots_otsphoto_Shutterstock.jpg")    
    
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