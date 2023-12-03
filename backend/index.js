// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const teamRoutes = require('./routes/teamRoutes.js');

const app = express();
require('dotenv').config();


app.use(cors());
app.use(bodyParser.json());
const PORT=process.env.PORT;
const mongodb_url=process.env.MONGO_URL;
mongoose.connect(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("Db connected successfully")})
.catch((err)=>{
    console.log("Error while connecting with DB",err.message);
})

app.use('/', userRoutes);
app.use('/', teamRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
