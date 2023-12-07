from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        user_id=2,
        product_id=5,
        rating=3,
        review_description="My mom said I looked really cute in them.",
        review_image="https://media.discordapp.net/attachments/1110721109076221993/1182199245755920445/IMG_0622.jpg?ex=6583d3d8&is=65715ed8&hm=ce5b63dbc5c43b03995eefd3c4d9fe439bfcc032600e1f4354e54533d3ccd890&=&format=webp&width=373&height=497")
    review2 = Review(
        user_id=3,
        product_id=5,
        rating=1,
        review_description="I don't want to wear a hat like this ever again!",
        review_image="https://cdn.discordapp.com/attachments/1110721109076221993/1182205895837483008/image0.jpg?ex=6583da09&is=65716509&hm=aa79d371cff77450f2aa0aefe70d1e227262f3b41bfa0bda1d04aca8fa68d1cd&")
    review3 = Review(
        user_id=4,
        product_id=5,
        rating=2,
        review_description="What's happening to me? It feels weird...",
        review_image="https://cdn.discordapp.com/attachments/1110721109076221993/1182205984383455292/image0.jpg?ex=6583da1f&is=6571651f&hm=02e93e390d82545563d842e29d5c77f72288c4fba56c864a88ff02c008b886e2&")
    review4 = Review(
        user_id=3,
        product_id=1,
        rating=3,
        review_description="Bunny hats are ok. This is one of the more tolerable hats I would wear.",
        review_image="https://media.discordapp.net/attachments/1110721109076221993/1182197954199687258/image0.jpg?ex=6583d2a4&is=65715da4&hm=5f6eeee167e42811c180f4414461f3b6cbf8158f47b3e6fc1b51c0f245cce37c&=&format=webp&width=373&height=497")    
    review5 = Review(
        user_id=5,
        product_id=1,
        rating=5,
        review_description="I think I look super cute with this hat on!",
        review_image="https://m.media-amazon.com/images/I/71ijFR1lwsL.jpg")        
    review7 = Review(
        user_id=1,
        product_id=2,
        rating=4,
        review_description="I thought these looked so adorable on Maddie, but she didn't care too much for it.",
        review_image="https://media.discordapp.net/attachments/1110721109076221993/1182199243272896592/IMG_1330.jpg?ex=6583d3d7&is=65715ed7&hm=a3847b843a44b03892a65949c8ad632114fbca132dacb260e20d3fa7a3142608&=&format=webp&width=373&height=497")    
    review8 = Review(
        user_id=3,
        product_id=2,
        rating=2,
        review_description="Not sure what happened to me here either, but these were ok.",
        review_image="https://media.discordapp.net/attachments/1110721109076221993/1182199242597597205/IMG_1331.jpg?ex=6583d3d7&is=65715ed7&hm=382ee812d34841ca300b979e841ee6afe50e3841124d6699e5101332806905fc&=&format=webp&width=373&height=497")    
    review9 = Review(
        user_id=4,
        product_id=2,
        rating=4,
        review_description="The stars looked and I want to eat them.",
        review_image="https://media.discordapp.net/attachments/1110721109076221993/1182199243918815302/IMG_1322.jpg?ex=6583d3d7&is=65715ed7&hm=f6e92e659bbda5559a979c9533421e8c70723b755637fad3b2a0ad113bfaf757&=&format=webp&width=414&height=497")    
    review11 = Review(
        user_id=2,
        product_id=3,
        rating=3,
        review_description="It didn't fit me too well, but it still looked cute!",
        review_image="https://media.discordapp.net/attachments/1110721109076221993/1182199246313750588/IMG_2554.jpg?ex=6583d3d8&is=65715ed8&hm=1cebdf53f3909fc2ced53fdd65edf6c8e14d3626e86bd55eb15ffd739c66b3b3&=&format=webp&width=373&height=497")    
    review12 = Review(
        user_id=4,
        product_id=3,
        rating=3,
        review_description="It was alright.",
        review_image="https://cdn.discordapp.com/attachments/1110721109076221993/1182208634369876068/image0.jpg?ex=6583dc96&is=65716796&hm=076da6e27fb91fe194d7876817cb897fc1a2a61b2b2d72b7d760ffb2417ec3ac&")    
    review13 = Review(
        user_id=2,
        product_id=4,
        rating=4,
        review_description="My Halloween costume came just in time and it was cute!",
        review_image="https://media.discordapp.net/attachments/1110721109076221993/1182197775635582996/image0.jpg?ex=6583d279&is=65715d79&hm=438674e0136c7bf1557a290e4b5ea222bdda849b0344ead77a370e79912d6fbc&=&format=webp&width=373&height=497")    
    review14 = Review(
        user_id=3,
        product_id=4,
        rating=2,
        review_description="Meh. Could be better.",
        review_image="https://media.discordapp.net/attachments/1110721109076221993/1182198479162978344/image0.jpg?ex=6583d321&is=65715e21&hm=aa8c417280b07d244f772111cf36809fdef73b74b64e1f19398e7e016bf3a677&=&format=webp&width=544&height=497")        
    review16 = Review(
        user_id=1,
        product_id=5,
        rating=4,
        review_description="I thought these looked so adorable on Maddie, but she didn't care too much for it.",
        review_image="https://media.discordapp.net/attachments/1110721109076221993/1182199243272896592/IMG_1330.jpg?ex=6583d3d7&is=65715ed7&hm=a3847b843a44b03892a65949c8ad632114fbca132dacb260e20d3fa7a3142608&=&format=webp&width=373&height=497")    
    review17 = Review(
        user_id=3,
        product_id=6,
        rating=2,
        review_description="Please spare me from wearing anymore hats...",
        review_image="https://media.discordapp.net/attachments/1110721109076221993/1182199246867415101/IMG_8263.jpg?ex=6583d3d8&is=65715ed8&hm=5a398ca8a0c8edaec73436493dae994e3725b96e1894179a43c3e6b00cc41c4d&=&format=webp&width=373&height=497")    
    review18 = Review(
        user_id=4,
        product_id=6,
        rating=4,
        review_description="Quality of the hat was made pretty well and I got free glasses with this purchase. Would recommend this seller!",
        review_image="https://media.discordapp.net/attachments/1110721109076221993/1182199247450419240/IMG_8252.jpg?ex=6583d3d8&is=65715ed8&hm=819f701a51d7128eda89ccf376b74c9fa097ec1cd6d7a0a4661f22b3ebc1cce5&=&format=webp&width=373&height=497")    
    review19 = Review(
        user_id=10,
        product_id=6,
        rating=5,
        review_description="Cool hat! I liked it.",
        review_image="https://pbs.twimg.com/media/E8IRGh0VcAAI2UE.jpg:large")    
   
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review16)
    db.session.add(review17)
    db.session.add(review18)
    db.session.add(review19)
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