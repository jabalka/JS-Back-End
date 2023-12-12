const Hotel = require("../models/Hotel");

async function createHotel(hotelData) {
    const hotel = new Hotel(hotelData);
    await hotel.save();

    return hotel;
}

async function getAllHotels() {
    const hotels = await Hotel.find({}).lean();

    return hotels;
}

async function getHotelById(id) {
    const hotel = await Hotel.findById(id).lean();

    return hotel;
}

async function deleteHotel(hotelId) {
    try {
        await Hotel.deleteOne({ _id: hotelId });
    } catch (err) {
        throw new Error("Error with deleting hotel!");
    }
}

async function updateHotel(hotelId, hotel) {
    const existing = await Hotel.findById(hotelId);
    if (!existing) {
        throw new Error("No such ID in database!");
    }
    Object.assign(existing, hotel);

    return existing.save();
}

async function bookHotel(hotelId, bookedById) {
    try {
        const existing = await Hotel.findById(hotelId);

        if (!existing) {
            throw new Error("No such ID in database!");
        }
        existing.bookedBy.push(bookedById);
        existing.rooms -= 1;

        await existing.save();
    } catch (err) {
        throw new Error(`Error booking hotel: ${err.message}`);
    }
}

async function findAllReservationsByUser(userId){
    try {
        return await Hotel.find({bookedBy: {$in: [userId]}}).lean();

    } catch(err){
        throw new Error(`Error booking hotel: ${err.message}`);
    }
}

module.exports = {
    createHotel,
    getAllHotels,
    getHotelById,
    deleteHotel,
    updateHotel,
    bookHotel,
    findAllReservationsByUser
};
