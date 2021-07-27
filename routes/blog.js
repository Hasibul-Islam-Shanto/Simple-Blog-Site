// External Imports
const express = require('express');
const Blog = require('./../models/blogdb');
const router = express.Router();


//routing
router.get('/new', (req, res) => {
    res.render('new', { blog: new Blog() });
});
router.get('/:id', async(req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog == null) res.redirect('/');
    res.render('show', { blog: blog });
});

router.post('/', async(req, res) => {
    let blog = new Blog({
        title: req.body.title,
        description: req.body.description,
    });
    try {
        blog = await blog.save();
        res.redirect(`/blog/${blog.id}`);
        console.log("Data is saved");
    } catch (e) {
        res.render('/new', { blog: blog });
        console.log("Data is not saved");
    }

});

router.delete('/:id', async(req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;