const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database connected")
})

// descriptors[Math.floor(Math.random() * descriptors.length)];
// const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 250; i++) {
        const random100 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60f99a2c982c0a08b00b1b52',
            location: `${cities[random100].city}, ${cities[random100].state}`,
            title: `${descriptors[Math.floor(Math.random() * descriptors.length)]} ${places[Math.floor(Math.random() * places.length)]}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia recusandae at labore repellendus. Ut facere placeat ullam necessitatibus nesciunt ea mollitia quam, magnam, impedit nostrum culpa quibusdam maxime consequuntur odio?',
            price,
            geometry: { 
                type : "Point", 
                coordinates : [
                    cities[random100].longitude,
                    cities[random100].latitude
                ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dultoby3p/image/upload/v1629016371/YelpCamp/zhkmndtg1kazwza2dz7p.jpg',
                  filename: 'YelpCamp/zhkmndtg1kazwza2dz7p'
                },
                {
                  url: 'https://res.cloudinary.com/dultoby3p/image/upload/v1629016375/YelpCamp/m6qquov9ahuxnkvxk3oj.jpg',
                  filename: 'YelpCamp/m6qquov9ahuxnkvxk3oj'
                }
              ]
        })
        await camp.save();
    }
};

seedDB()
    .then(() => {
        mongoose.connection.close();
    })