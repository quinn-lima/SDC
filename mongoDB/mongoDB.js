const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db', {useNewUrlParser: true, useUnifiedTopology: true});
const fs = require('fs')

const reviewsSchema = new mongoose.Schema({
  id INT NOT NULL UNIQUE,
  product_id : Number,
  rating: Number,
  date: Number,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number, 
});


Primary Key (reviews_key)

const characteristicsSchema = new mongoose.Schema ( {
  name: String
})
 Primary Key (characteristics_key)

const reviews_photosSchema = new mongoose.Schema({
  url: String
})
review_id INT REFFERENCES reviews (id)

const characteristics_reviewsSchema = new mongoose.Schema({
  value: Number
})

review_id INT REFFERENCES reviews (id)



var reviews = mongoose.model('reviews', reviewsSchema);

var characteristics = mongoose.model('characteristics', characteristicsSchema);

var reviews_photos = mongoose.model('reviews_photos', reviews_photosSchema);

var characteristics_reviews = mongoose.model('characteristics_reviews', characteristics_reviewsSchema);




let create = function () {
    
  let array = [{
    name: 'Bob Ross',
    img: 'photos/Bobross.jpeg'
  }, {
    name: 'mongoose',
    img: 'photos/cute-mongoose.jpeg'
    }]



  SpiritAnimal.create(array)
  }

  //create()


    //a.img.data = fs.readFileSync('/Users/quinn/hello/hr-rpp29-mvp/database/photos/cute-mongoose.jpeg');



let getPhoto = function() {
  return (SpiritAnimal.find({}, (err, photo) => {
    if (err) {
      console.log('error!')
    }
    if (photo) {
      console.log(photo)
      return (photo)
    }
  }))
}



module.exports.getPhoto = getPhoto;
module.exports.create = create;