from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review_description = db.Column(db.String(300), nullable=False)
    review_image = db.Column(db.String, nullable=True)
    
    user = db.relationship("User", back_populates="review")
    product = db.relationship("Product", back_populates="review")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'rating': self.rating,
            'review_description': self.review_description,
            'review_image': self.review_image,
            'user': self.user.to_dict(),
            'product': self.product.to_dict()
        }
