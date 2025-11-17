const mongoose  = require('mongoose')

const connectDB = mongoose.connect("mongodb+srv://ssaifssyed17_db_user:h1tkAyxxTcx6Foy7@cluster1.tibtqql.mongodb.net/")
    .then((data)=>{ console.log("DB connected") })
    .catch((err)=>{ console.log("DB not connected",err) })

module.exports = connectDB

