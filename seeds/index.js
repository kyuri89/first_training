const mongoose = require('mongoose')
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('MongoDBコネクション成功');
    })
    .catch(err => {
        console.log('MongoDBコネクションエラー');
        console.log(err);
    })

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const randomCityIndex = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 5000) + 1000;
        const camp = new Campground({
            author: '65f7a771b4efc245949a827c',
            location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
            title: `${sample(descriptors)}・${sample(places)}`,
            description: '雄大な自然の中に突如と現れる。まさに自然と一体しており、都会の喧騒からは離れた体験を提供する。',
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[randomCityIndex].longitude,
                    cities[randomCityIndex].latitude
                ]
            },
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dcjditvef/image/upload/v1710768992/YelpCamp/uu11qg419t8sqkpjo7pq.jpg',
                  filename: 'YelpCamp/uu11qg419t8sqkpjo7pq'
                },
                {
                  url: 'https://res.cloudinary.com/dcjditvef/image/upload/v1710768994/YelpCamp/qhyyvsvzjyjfh9gws46e.jpg',
                  filename: 'YelpCamp/qhyyvsvzjyjfh9gws46e'
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});