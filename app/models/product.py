from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    product_name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # relationship
    # 1 product can only belong to 1 user
    user = db.relationship("User", back_populates="product")
    review = db.relationship("Review", back_populates='product', cascade='all, delete')

    # 1 product can have many images
    # img_urls = db.relationship("ProductImage", back_populates="spot", lazy=True, cascade='all, delete' )


    def to_dict(self):
        return {
            'id': self.id,
            'product_owner_id': self.product_owner_id,
            'product_name': self.product_name,
            'description': self.description,
            'category': self.category,
            'price': self.price,
            'user': self.user.to_dict() if self.user else None,
            'review': [review.to_dict() for review in self.review],
            # 'img_urls': [image.img_url for image in self.img_urls],
        }
