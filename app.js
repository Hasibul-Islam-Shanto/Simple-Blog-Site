//External Imports....
const express = require('express');
const app = express()
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//Internal Imports...
const blogRouter = require('./routes/blog');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
const Blog = require('./models/blogdb');

//DataBase COnnection
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// View Engine set
app.set('view engine', 'ejs');

//Routing from here....
app.use('/blog', blogRouter);
app.get('/', async(req, res) => {
    let blog = await Blog.find();
    res.render('home', { blog: blog });

});


// Server is Listening from here....
app.listen(5000, () => {
    console.log("Sever is Listening at 5000");
});