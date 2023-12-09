from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import db, Product
from app.forms import ProductForm
from .auth_routes import validation_errors_to_error_messages
from .aws_helper import upload_file_to_s3, get_unique_filename, remove_file_from_s3

products_route = Blueprint('products', __name__)

@products_route.route("/")
def get_products():
    """
    Get all products
    """
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@products_route.route("/<int:id>")
def get_product(id):
    """
    Get one product
    """
    product = Product.query.get(id)
    if product:
        return product.to_dict()
    else:
        return {"error": "Product could not be found"}, 404

@products_route.route("/new", methods=["POST"])
@login_required
def create_product():
    """
    Create product (while logged in)
    """
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product_params = Product(
            product_owner_id=current_user.id,
            product_name=form.data["product_name"],
            product_description=form.data["product_description"],
            product_category=form.data["product_category"],
            product_price=form.data["product_price"],
        )

        product_image = form.data["product_image"]
        product_image.filename = get_unique_filename(product_image.filename)
        uploadProductImage = upload_file_to_s3(product_image)

        if "url" not in uploadProductImage:
            print(uploadProductImage)
            return uploadProductImage
        else:
            product_params.product_image = uploadProductImage["url"]

        db.session.add(product_params)
        db.session.commit()

        return {"newProduct": product_params.to_dict()}
    return {"error": validation_errors_to_error_messages(form.errors)}, 400

@products_route.route("/<int:id>", methods=["PUT"])
@login_required
def update_product(id):
    """
    Update product (while logged in)
    """
    product = Product.query.get(id)

    if not product:
        return {"message": "Product not found"}, 404

    if current_user.id != product.product_owner_id:
        return {"message": "You do not have permission make changes to this product!"}, 403

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product.product_owner_id = current_user.id
        product.product_name = form.data["product_name"]
        product.product_description = form.data["product_description"]
        product.product_category = form.data["product_category"]
        product.product_price = form.data["product_price"]
        product.product_image = form.data["product_image"]

        if form.data['product_image']:
            product_image = form.data["product_image"]
            product_image.filename = get_unique_filename(product_image.filename)

            if product.product_image:
                remove_file_from_s3(product.product_image)
            updateProductImage = upload_file_to_s3(product_image)

            if "url" not in updateProductImage:
                print(updateProductImage)
                return updateProductImage
            else:
                product.product_image = updateProductImage["url"]


        db.session.commit()

        return {"resUpdateproduct": product.to_dict()}

    return {"error": validation_errors_to_error_messages(form.errors)}, 400

@products_route.route("/<int:productId>", methods=["DELETE"])
@login_required
def delete_product(productId):
    """
    Delete product (while logged in)
    """
    currentProduct = Product.query.get(productId)

    if not currentProduct:
        return {'error': 'product does not exists'}, 404

    if currentProduct.product_owner_id != current_user.id:
        return {'error': 'You do not have permission to delete this product'}, 401

    db.session.delete(currentProduct)
    db.session.commit()
    return {'error': 'Product successfully deleted'}