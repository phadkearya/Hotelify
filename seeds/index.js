const mongoose = require('mongoose');
const Hotel = require('../models/hotel');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-hotel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDb = async () => {
    await Hotel.deleteMany({});
    for (let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 406);
        const price = Math.floor(Math.random() * 20000) + 1000;
        const hotel = new Hotel({
            author: '62c7373987d9b3a20767a989',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            title: `${sample(descriptors)} ${sample(places)}`,
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dwsoizmbr/image/upload/v1657140228/YelpCamp/rrirvp2rpjlshr58ucys.jpg',
                    filename: 'YelpCamp/rrirvp2rpjlshr58ucys',
                }
            ],
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].lng, cities[random1000].lat]
            },
        })
        await hotel.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})