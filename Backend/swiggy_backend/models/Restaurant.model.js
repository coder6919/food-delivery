const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name: String,
    rating: String,
    deliveryTime: String,
    imageUrl: String,
    cuisines: String

})
const RestaurantModel = mongoose.model('Restaurant', restaurantSchema);

module.exports = RestaurantModel