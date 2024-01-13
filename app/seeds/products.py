from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    product1 = Product(
        product_owner_id=7,
        product_name="Cat Cap Bunny Ears Hat - Blind Box",
        product_description="Don't walk, HOP to get this on your feline friend! This whimsical cat cap is the purrfect gift for cat lovers. The soft and stretchy fabric fits snugly on your little one's head, transforming them into a lovable bunny-eared cat. This cat cap is sure to bring a smile to everyone's face.",
        product_category="hat",
        product_price=9.99,
        product_image="https://friendsnyc.com/cdn/shop/files/bunny-ears-blind-april-fools-gifts-rabbit-587_1300x.jpg?v=1694712052")
    product2 = Product(
        product_owner_id=6,
        product_name="Star Clips",
        product_description="Guess what? We are a shop that specialize in clips for pets, and they look like stars! It's like putting little twinkling stars on your furry friend—it's so pretty!",
        product_category="accessories",
        product_price=5.75,
        product_image="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/af23443f3dd41cf649f99456e9f7c6c6.jpg?imageMogr2/auto-orient%7CimageView2/2/w/1300/q/80/format/webp")
    product3 = Product(
        product_owner_id=1,
        product_name="Toast hat",
        product_description="Picture this: a hat for pets that looks like toast! It's like a fun accessory that turns your furry friend into a cute little toast buddy. How adorable is that?",
        product_category="hat",
        product_price=14.25,
        product_image="https://sp.apolloboxassets.com/vendor/product/productImages/2019-11-20/3SqzbArray_1-(4).jpg")
    product4 = Product(
        product_owner_id=9,
        product_name="Pumpkin Pooch Costume",
        product_description="Welcome to our unique shop specializing in canine fashion. We offer a delightful collection of pet outfits designed specifically to transform your furry companions into charming pumpkins. These outfits are crafted with attention to detail, ensuring both comfort and style for your dogs. Whether you're preparing for a festive occasion or simply want to add a touch of whimsy to your pet's wardrobe, our pumpkin outfits are the perfect choice!",
        product_category="clothing",
        product_price=10.59,
        product_image="https://i.ebayimg.com/images/g/6OsAAOSwNxNjEGmY/s-l400.jpg")
    product5 = Product(
        product_owner_id=5,
        product_name="Custom Pomelo Hat",
        product_description="Discover the latest trend in animal fashion at our store, Pomelo Hats, for any pet! These unique hats are designed to add a touch of humor and style to your pet's wardrobe. Crafted with quality materials, the hats ensure a comfortable fit for your fur baby. The pomelo-inspired design brings a playful and cheerful vibe, making it perfect for various occasions or just to make them the center of attention. Elevate your pet's fashion game with our adorable Pomelo Hats, turning everyday moments into memorable ones.",
        product_category="hat",
        product_price=5.75,
        product_image="https://sadanduseless.b-cdn.net/wp-content/uploads/2019/09/fruit-hats13.jpg")
    product6 = Product(
        product_owner_id=6,
        product_name="Kirby's Pet Hat Haven",
        product_description="Our shop is your go-to destination for enchanting hats designed exclusively for pets. Explore our collection inspired by the lovable pink character, Kirby. From whimsical designs to cozy fits, our Kirby-themed hats promise to transform your furry friends into adorable, magical companions. Step into a world of playful fashion at our shop, where every hat carries the spirit of Kirby.",
        product_category="hat",
        product_price=12.75,
        product_image="https://i.ebayimg.com/images/g/MqsAAOSwegReVo-m/s-l500.jpg")
    product7 = Product(
        product_owner_id=3,
        product_name="Yankees Hat",
        product_description="Let your furry friend join the Yankees fandom with our New York Yankees Dog Baseball Hat. This adorable and comfortable hat is specially designed for dogs, featuring the iconic Yankees logo embroidered with precision. Now your pup can cheer for the team alongside you in style during game days or everyday outings.",
        product_category="accessories",
        product_price=25.15,
        product_image="https://i.ebayimg.com/images/g/Gj0AAOSwlaFhrwq7/s-l1600.jpg")
    product8 = Product(
        product_owner_id=2,
        product_name="Rainbow Unicorn Costume",
        product_description="Transform your pet into a magical creature with our Rainbow Unicorn Costume. Made with soft and lightweight materials, this costume ensures your pet's comfort while adding a touch of fantasy to their look. It's perfect for costume parties, photoshoots, or just a whimsical day out!",
        product_category="clothing",
        product_price=15.75,
        product_image="https://us.123rf.com/450wm/liudmilachernetska/liudmilachernetska2303/liudmilachernetska230317946/199871102-cute-dog-with-rainbow-unicorn-horn-on-blurred-sparkling-background.jpg?ver=6")
    product9 = Product(
        product_owner_id=8,
        product_name="Fish-Shaped Cat Bed",
        product_description="Spoil your feline friend with our cozy fish-shaped cat bed. The unique design provides a comfortable and secure space for your cat to rest and nap. The fish shape adds a playful touch to your home decor, making it both functional and stylish!",
        product_category="bed",
        product_price=20.99,
        product_image="https://i.etsystatic.com/46328568/r/il/c23678/5288752587/il_570xN.5288752587_p798.jpg")
    product10 = Product(
        product_owner_id=4,
        product_name="Pet Paw Print Necklace",
        product_description="Keep your beloved pet close to your heart with our elegant paw print necklace. Crafted with love and attention to detail, this necklace is a beautiful way to celebrate the bond between you and your furry companion. A perfect gift for pet lovers!",
        product_category="jewelry",
        product_price=59.99,
        product_image="https://carolandcompany.us/cdn/shop/products/NA1628.webp?v=1658338831")
    product11 = Product(
        product_owner_id=9,
        product_name="Bird Dog Bandana",
        product_description="Add a pop of color to your dog's wardrobe with our tropical bird-themed dog bandana. Made from soft and breathable fabric, this bandana is not only stylish but also comfortable for your furry friend. Perfect for outings, playdates, or just to showcase their personality!",
        product_category="accessories",
        product_price=17.55,
        product_image="https://isteam.wsimg.com/ip/31614e7a-c3a1-11e5-8887-14feb5d40a06/ols/8877_original/:/rs=w:600,h:600")
    product12 = Product(
        product_owner_id=7,
        product_name="Cactus Cat Scratching Post",
        product_description="Give your cat a stylish and functional scratching post with our cactus-shaped design. This scratching post provides an outlet for your cat's natural scratching instincts while adding a touch of desert-inspired decor to your home. Keep your furniture safe and your cat entertained!",
        product_category="furniture",
        product_price=25.55,
        product_image="https://image.chewy.com/ca/is/image/catalog/1000015262_MAIN._AC_SL600_V1692691033_.jpg")
    product13 = Product(
        product_owner_id=6,
        product_name="Sock Dog Bandana",
        product_description="Whether your dog is a fashion-forward trendsetter or just loves a touch of whimsy, this bandana adds a playful charm to their look. The sock-themed design brings a sense of coziness and fun, making it perfect for everyday wear or special occasions. A must-have for pet lovers who want to showcase their love for animals!",
        product_category="accessories",
        product_price=12,
        product_image="https://i.etsystatic.com/10846787/r/il/6c17d1/2900679341/il_570xN.2900679341_9kjd.jpg")
    product14 = Product(
        product_owner_id=5,
        product_name="Wooden Pet Bowl Stand",
        product_description="Elevate your pet's dining experience with our wooden pet bowl stand. The elevated design reduces strain on your pet's neck and provides a stylish and functional solution for feeding time. Available in various sizes to suit your pet's needs!",
        product_category="bowl",
        product_price=22.99,
        product_image="https://i.ebayimg.com/images/g/kVUAAOSwuO9hnPvq/s-l1200.webp")
    product15 = Product(
        product_owner_id=1,
        product_name="Mermaid Tail Cat Bed",
        product_description="Create a magical space for your cat with our mermaid tail cat bed. The unique mermaid tail design adds a whimsical touch to your home, and the cozy bed provides a comfortable spot for your cat to relax and nap. Make your cat feel like they're part of a fairytale!",
        product_category="bed",
        product_price=28.12,
        product_image="https://www.zezelife.com/wp-content/uploads/2023/03/7-16.jpg")
    product16 = Product(
        product_owner_id=8,
        product_name="Pet Portrait Custom Illustration",
        product_description="Capture the essence of your pet with a custom pet portrait illustration. Our talented artists will create a unique and personalized illustration based on a photo of your furry friend. A perfect gift for pet owners who want to cherish their pets in art form!",
        product_category="art",
        product_price=129.99,
        product_image="https://i.etsystatic.com/23032371/r/il/2cf2ca/4337929119/il_570xN.4337929119_si67.jpg")
    product17 = Product(
        product_owner_id=3,
        product_name="Sushi Catnip Toys Set",
        product_description="Indulge your cat's playful side with our sushi-themed catnip toys set. Each toy is shaped like a different sushi roll and filled with high-quality catnip to entice your cat's natural instincts. Keep your cat entertained and happy with these adorable toys!",
        product_category="toys",
        product_price=9.99,
        product_image="https://image.chewy.com/is/image/catalog/370841_MAIN._AC_SL600_V1647467802_.jpg")
    product18 = Product(
        product_owner_id=4,
        product_name="Doggy Bowtie Collar",
        product_description="Dress your canine companion in style with our doggy bowtie collar. This accessory adds a touch of sophistication to your dog's appearance, making them stand out on any occasion. Whether it's a special event or a casual stroll in the park, your dog will look charming with this bowtie collar.",
        product_category="accessories",
        product_price=19.99,
        product_image="https://www.birdygrey.com/cdn/shop/products/BIRDY_GREY_MUGGSY_DOG_BOW_TIE_COLLAR_DARK_MAUVE_02_773c27e0-45b1-46c5-8a33-593430f89859.jpg?v=1645236314&width=2048")
    product19 = Product(
        product_owner_id=2,
        product_name="Pet-friendly Succulent Garden",
        product_description="Bring the beauty of nature to your pet's space with our pet-friendly succulent garden. This low-maintenance garden is designed with pet-safe plants, creating a calming and aesthetically pleasing environment for your furry friends. Perfect for pet owners who want to add a touch of greenery to their home!",
        product_category="home decor",
        product_price=18.29,
        product_image="https://mountaincrestgardens.com/product_images/uploaded_images/pets-dog-plant.jpg")
    product20 = Product(
        product_owner_id=7,
        product_name="Propeller Hat",
        product_description="Made from durable and pet-friendly materials, this propeller hat is perfect for playdates, parties, or even just a walk around the block. It's not just a hat; it's a statement piece that showcases your dog's fun-loving personality.",
        product_category="accessories",
        product_price=14.81,
        product_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1VW4T-iL0GevbUd9Z7rDp-WCBMDex0LGxycE1GJVNxBd5Xjj7ErzO14Dq5sPrpPbKNhM&usqp=CAU")

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
    db.session.add(product12)
    db.session.add(product13)
    db.session.add(product14)
    db.session.add(product15)
    db.session.add(product16)
    db.session.add(product17)
    db.session.add(product18)
    db.session.add(product19)
    db.session.add(product20)

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