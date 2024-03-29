from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import db, Review, User
from app.forms import UpdateReviewForm, CreateReviewForm
from .auth_routes import validation_errors_to_error_messages
from .aws_helper import upload_file_to_s3, get_unique_filename, remove_file_from_s3

reviews_route = Blueprint('reviews', __name__)

## get all reviews route
@reviews_route.route("/<int:product_id>")
def product_reviews(product_id):
    '''
    Get all reviews for a specific product
    '''
    reviews = Review.query.filter_by(product_id=product_id).all()
    return jsonify([review.to_dict() for review in reviews])

## create review route
@reviews_route.route("/new/<int:product_id>", methods=["POST"])
@login_required
def create_review(product_id):
    '''
    Create a new review for a specific product
    '''
    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():

        rating = form.data["rating"]
        review_description = form.data["review_description"]

        new_review = Review(
            user_id=current_user.id,
            product_id=product_id, 
            rating=rating, 
            review_description=review_description, 
        )

        review_image = form.data["review_image"]

        if review_image:
            review_image.filename = get_unique_filename(review_image.filename)
            uploadReviewImage = upload_file_to_s3(review_image)

            if "url" not in uploadReviewImage:
                print(uploadReviewImage)
                return uploadReviewImage
            else:
                new_review.review_image = uploadReviewImage["url"]

        db.session.add(new_review)
        db.session.commit()

        return {"new_review": new_review.to_dict()}
    else:
        errors = form.errors
        return jsonify({"message": "Invalid form submission", "errors": errors}), 400

@reviews_route.route("/<int:review_id>", methods=["PUT"])
@login_required
def update_review(review_id):
    '''
    Update an existing review
    '''
    form = UpdateReviewForm(request.form)
    form['csrf_token'].data = request.cookies['csrf_token']

    print(form.data)

    if request.method == "PUT" and form.validate_on_submit():
        review = Review.query.get(review_id)

        if not review:
            return jsonify({"error": "Review not found"}), 404

        review.rating = form.data.get("rating", review.rating)
        review.review_description = form.data.get("review_description", review.review_description)

        review_image = request.files.get("review_image")

        if review_image:
            review_image.filename = get_unique_filename(review_image.filename)
            uploadReviewImage = upload_file_to_s3(review_image)

            if "url" not in uploadReviewImage:
                return jsonify({"error": "Failed to upload review image"}), 400

            review.review_image = uploadReviewImage["url"]

        db.session.add(review)
        db.session.commit()

        return {"updateReview": review.to_dict()}
    else:
        print(form.errors)
        return jsonify({"Something wrong with form submission": form.errors}), 400

## delete review route
@reviews_route.route('/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get(review_id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return jsonify({"message": "Review deleted successfully"})
    else:
        return jsonify({"error": "Review not found"}), 404
