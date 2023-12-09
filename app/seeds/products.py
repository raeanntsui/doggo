from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    product1 = Product(
        product_owner_id=7,
        product_name="Cat Cap Bunny Ears Hat - Blind Box",
        product_description="Don't walk, HOP to get this on your feline friend! This whimsical cat cap is the purrfect gift for cat lovers. The soft and stretchy fabric fits snugly on your little one's head, transforming them into a lovable bunny-eared cat. This cat cap is sure to bring a smile to everyone's face.",
        product_category="hat",
        product_price=9,
        product_image="https://friendsnyc.com/cdn/shop/files/bunny-ears-blind-april-fools-gifts-rabbit-587_1300x.jpg?v=1694712052")
    product2 = Product(
        product_owner_id=6,
        product_name="Star Clips",
        product_description="Guess what? We are a shop that specialize in clips for pets, and they look like stars! It's like putting little twinkling stars on your furry friend—it's so pretty!",
        product_category="accessories",
        product_price=5,
        product_image="https://m.media-amazon.com/images/I/7111Czh0nDL.jpg")
    product3 = Product(
        product_owner_id=1,
        product_name="Toast hat",
        product_description="Picture this: a hat for pets that looks like toast! It's like a fun accessory that turns your furry friend into a cute little toast buddy. How adorable is that?",
        product_category="hat",
        product_price=14,
        product_image="https://sp.apolloboxassets.com/vendor/product/productImages/2019-11-20/3SqzbArray_1-(4).jpg")
    product4 = Product(
        product_owner_id=9,
        product_name="Pumpkin Pooch Costume",
        product_description="Welcome to our unique shop specializing in canine fashion. We offer a delightful collection of pet outfits designed specifically to transform your furry companions into charming pumpkins. These outfits are crafted with attention to detail, ensuring both comfort and style for your dogs. Whether you're preparing for a festive occasion or simply want to add a touch of whimsy to your pet's wardrobe, our pumpkin outfits are the perfect choice!",
        product_category="clothing",
        product_price=10,
        product_image="https://i.ebayimg.com/images/g/6OsAAOSwNxNjEGmY/s-l400.jpg")
    product5 = Product(
        product_owner_id=5,
        product_name="Custom Pomelo Hat",
        product_description="Discover the latest trend in animal fashion at our store, Pomelo Hats, for any pet! These unique hats are designed to add a touch of humor and style to your pet's wardrobe. Crafted with quality materials, the hats ensure a comfortable fit for your fur baby. The pomelo-inspired design brings a playful and cheerful vibe, making it perfect for various occasions or just to make them the center of attention. Elevate your pet's fashion game with our adorable Pomelo Hats, turning everyday moments into memorable ones.",
        product_category="hat",
        product_price=5,
        product_image="https://sadanduseless.b-cdn.net/wp-content/uploads/2019/09/fruit-hats13.jpg")
    product6 = Product(
        product_owner_id=6,
        product_name="Kirby's Pet Hat Haven",
        product_description="Our shop is your go-to destination for enchanting hats designed exclusively for pets. Explore our collection inspired by the lovable pink character, Kirby. From whimsical designs to cozy fits, our Kirby-themed hats promise to transform your furry friends into adorable, magical companions. Step into a world of playful fashion at our shop, where every hat carries the spirit of Kirby.",
        product_category="hat",
        product_price=12,
        product_image="https://m.media-amazon.com/images/I/61mdLfMohKL._AC_UF350,350_QL80_.jpg")
    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
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