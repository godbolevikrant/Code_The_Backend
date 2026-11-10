const app = require('./src/app.js')
const mongoose = require('mongoose')
require('dotenv').config()
const port = 3000

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})