from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, IntegerField, SelectField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class ProductForm(FlaskForm):
    product_name = StringField('Name', validators=[DataRequired()])
    product_description = StringField("Description", validators=[DataRequired()])
    product_category = StringField("Category", validators=[DataRequired()])
    product_price = IntegerField("Price", validators=[DataRequired(), NumberRange(min=1, max=99999)])
    product_image = StringField("Product Image")
    submit = SubmitField("Submit")