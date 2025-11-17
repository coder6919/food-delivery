const express = require('express')

// const connectDB = 
require('./config/db')
// const User = require('./models/User.model');
const cors = require('cors')
const app = express()

const PORT = 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// connectDB()
// app.get('/Users', async (req,res)=>{
//     let allUsers = await User.find()
//     res.send(allUsers)
// })
app.get('/', (req,res)=>{
    res.send("default route")
    
})
const restaurantRoutes = require('./routes/restaurant.routes');
const userRoutes = require('./routes/user.routes')
restaurantRoutes(app)
userRoutes(app)

app.listen(PORT, ()=>{
    console.log(`Server running at PORT, ${PORT}`)
})