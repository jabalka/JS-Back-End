module.exports = {
    details: async (req, res) => {
        const id = req.params.id;
        const cube = await req.storage.getById(id);

        if (cube == undefined) {
            res.redirect("/404");
        } else {
            const ctx = {
                title: "Details Page",
                cube,
            };
            res.render("details", ctx);
        }
    },
};
