from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, IntegerField, SubmitField, FileField
from wtforms.validators import DataRequired, NumberRange, Length
from flask_wtf.file import FileField, FileAllowed
from ..api.aws_helper import ALLOWED_EXTENSIONS
            
class UpdateReviewForm(FlaskForm):
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5, message="Rating must be between 1 and 5 stars")])
    review_description = StringField("Description", validators=[DataRequired(), Length(min=10, max=500, message="Description length must be between 10 and 500 characters long")])
    submit = SubmitField("Submit")

class CreateReviewForm(UpdateReviewForm):
    review_image = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
