module.exports = {
    showEdit: async (req, res) => {
        const cube = await req.storage.getById(req.params.id);

        if(!cube){
            res.redirect("/404");
        } else {
            res.render("edit", {title:"Edit Page", cube});
        }
    }, 
    postEdit: async (req, res) => {
        const cube = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty: Number(req.body.difficulty)
        };
        try{
            await req.storage.edit(req.params.id, cube);
            res.redirect('/details/' + req.params.id);
        } catch(err){
            res.redirect("/404");
        }
    }
}