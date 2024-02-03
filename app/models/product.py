from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    product_name = db.Column(db.String, nullable=False)
    product_description = db.Column(db.String, nullable=False)
    product_category = db.Column(db.String, nullable=False)
    product_price = db.Column(db.Integer, nullable=False)
    product_image = db.Column(db.String, nullable=True)
    
    user = db.relationship("User", back_populates="product")
    review = db.relationship("Review", back_populates='product', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'product_owner_id': self.product_owner_id,
            'product_name': self.product_name,
            'product_description': self.product_description,
            'product_category': self.product_category,
            'product_price': self.product_price,
            'product_image': self.product_image,
            'user': self.user.to_dict() if self.user else None,
            # 'review': [review.to_dict() for review in self.review],
        }
