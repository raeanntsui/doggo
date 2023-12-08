from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, DecimalField, TextAreaField, IntegerField, SelectField, SubmitField, FileField
from wtforms.validators import DataRequired, NumberRange, Length, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import ValidationError
from ..api.aws_helper import ALLOWED_EXTENSIONS
            
class ReviewForm(FlaskForm):
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5, message="Rating must be between 1 and 5 stars")])
    review_description = StringField("Description", validators=[DataRequired(), Length(min=10, max=500, message="Description length must be between 10 and 500 characters long")])
    review_image = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Submit")