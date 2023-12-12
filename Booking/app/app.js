
document.querySelector('.remove').addEventListener('click', async(event) => {
    const hotelId = req.params.id;
    try{
        await req.storage.deleteHotel(hotelId);
        
        res.render('/');
    } catch(err){
        console.log(err);
    }
})
