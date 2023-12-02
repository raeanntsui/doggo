from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    product1 = Product(
        product_owner_id=1,
        product_name="Dog Tags",
        product_description="Welcome to the Dog Tag Emporium, where canine fashion meets functionality! Our specialized store is dedicated to providing a wide array of dog tags for our four-legged friends. These tags are not just stylish accessories; they serve a crucial purpose in ensuring the safety and well-being of our beloved pets.",
        product_category="accessory",
        product_price=15,
        product_image="https://i5.walmartimages.com/asr/f342c594-8428-4740-a217-5d64e8e0b279.aef898b7f24b34fc7538d5121c31c2a5.jpeg")
    product2 = Product(
        product_owner_id=2,
        product_name="Dog Hoodie",
        product_description="Introducing our Pawsome Comfort Hoodie—a must-have for your canine companion's wardrobe. This dog hoodie combines fashion and function to provide unparalleled comfort and style for your furry friend.",
        product_category="clothing",
        product_price=50,
        product_image="https://m.media-amazon.com/images/I/61aNP5iRTSL._AC_UF1000,1000_QL80_.jpg")
    product3 = Product(
        product_owner_id=3,
        product_name="Dog Boots",
        product_description="Introducing our PawsGuard Booties—an essential accessory for your adventurous canine companion. These dog booties are designed to provide protection, comfort, and style for your furry friend's paws during various outdoor activities.",
        product_category="shoes",
        product_price=25,
        product_image="https://footwearnews.com/wp-content/uploads/2020/04/dog-shoes.jpg")

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()