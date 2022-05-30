// This file will stand alone from the others just in case we want to make manual changes to our model or data.
// We will set up our SEED logic in this file

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
// Here we will require the Campground model so we can use it in our page routing.
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify makes the Mongoose error go away from the terminal.
    // useFindAndModify: false

});

// Logic that checks whether or not there is an error connecting our to the database.
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

// Here we'll put our random place and descriptors together
const sample = (array) => array[Math.floor(Math.random() * array.length)];

// Here we will remove everything from the database when camps are deleted in our routung. So we will loop over ALL 1000 cities and we should get back 50 campgrounds.
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '628bb44943d162e48d67c17b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi autem esse blanditiis dicta, expedita eaque non earum doloribus, incidunt repellendus sequi voluptate maiores. Eaque necessitatibus aperiam quia enim maxime praesentium.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dllqasrlk/image/upload/v1653507750/YelpCamp/dxtmjazku08bieqn4y0z.jpg',
                    filename: 'YelpCamp/dxtmjazku08bieqn4y0z'
                },
                {
                    url: 'https://res.cloudinary.com/dllqasrlk/image/upload/v1653507750/YelpCamp/ur5l65tc8flwwnqhoera.jpg',
                    filename: 'YelpCamp/ur5l65tc8flwwnqhoera'
                }
            ]
        })
        await camp.save();
    }
}

// This function closes our database when the code above is completed
seedDB().then(() => {
    mongoose.connection.close();
})

    // This code was used to be sure our seeds file is connected to our database.
    // const seedDB = async () => {
    //     await Campground.deleteMany({});
    //     const c = new Campground({ title: 'purple field' });
    //     await c.save();
    // }

    // Be sure to execute seedDB here:


