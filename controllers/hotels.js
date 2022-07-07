const Hotel = require('../models/hotel');
const mongoose = require('mongoose');
const ExpressError = require('../utils/ExpressError');
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });


module.exports.index = async (req, res) => {
    const hotels = await Hotel.find();
    res.render('hotels/index', {hotels});
}

module.exports.renderNewForm = (req, res) => {
    res.render('hotels/new');
}

module.exports.createHotel = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.hotel.location,
        limit: 1
    }).send();
    const hotel = new Hotel(req.body.hotel);
    hotel.geometry = geoData.body.features[0].geometry;
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    hotel.author = req.user._id;
    hotel.images.push(...imgs);
    await hotel.save(); 
    req.flash('success', 'Successfully made a new hotel!');
    res.redirect(`hotels/${hotel._id}`);
}

module.exports.showHotel = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const hotel = await Hotel.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    console.log(hotel);
    if (!hotel) {
        req.flash('error', 'Cannot find that hotel');
        return res.redirect('/hotels');
    }
    res.render('hotels/show', {hotel});
}

module.exports.renderEditForm = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    // const { id } = req.params; 
    const hotel = await Hotel.findById(id);
    if (!hotel) {
        req.flash('error', 'Cannot find that hotel');
        return res.redirect('/hotels');
    }
    res.render('hotels/edit', {hotel});
}

module.exports.updateHotel = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const hotel = await Hotel.findByIdAndUpdate(id, { ...req.body.hotel });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    hotel.images.push(...imgs);
    await hotel.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await hotel.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash('success', 'Successfully updated Hotel!');
    res.redirect(`/hotels/${hotel._id}`);
}

module.exports.deleteHotel = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const hotel = await Hotel.findById(id);
    await Hotel.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted Hotel!');
    res.redirect('/hotels');
}