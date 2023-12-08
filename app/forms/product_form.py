from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, DecimalField, TextAreaField, IntegerField, SelectField, SubmitField
from wtforms.validators import DataRequired, NumberRange
from ..api.aws_helper import ALLOWED_EXTENSIONS

class ProductForm(FlaskForm):
    product_name = StringField('Name', validators=[DataRequired()])
    product_description = StringField("Description", validators=[DataRequired()])
    product_category = StringField("Category", validators=[DataRequired()])
    product_price = IntegerField("Price", validators=[DataRequired(), NumberRange(min=1, max=99999)])
    product_image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Submit")