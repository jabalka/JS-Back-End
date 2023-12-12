const Play = require('../models/Play');

async function createPlay(playData){
    const play = new Play(playData);
    await play.save();

    return play;
}

async function getAllPlays(){
    const plays = await Play.find({}).lean();

    return plays;
}

async function getPlayById(playId){
    const play = await Play.findById(playId).lean();

    return play;
}

async function deletePlay(playId){
    try{
        await Play.deleteOne({_id: playId});
    }catch(err){
        throw new Error('Error with deleting play!');
    }
}

async function updatePlay(playId, udpatedPlay){
    const existing = await Play.findById(playId);
    if(!existing){
        throw new Error('No such ID in database');
    }
    Object.assign(existing, udpatedPlay);

    return existing.save();
}

async function likePlay(playId, userId){
    try{
        const existing = await Play.findById(playId);

        if(!existing){
            throw new Error('No such Id in database!');
        }
        existing.likedBy.push(userId);

        await existing.save();
    }catch(err){
        throw new Error(`Error with like play: ${err.message}`);
    }
}

async function findAllLikedByUser(userId){

    try{
        return await Play.find({likedBy: {$in: [userId]}}).lean();
    } catch(err){
        throw new Error('Error with finding the liked plays!');
    }
}

module.exports = {
    findAllLikedByUser,
    likePlay,
    updatePlay,
    deletePlay,
    getPlayById,
    getAllPlays,
    createPlay
}