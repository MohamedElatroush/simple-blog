//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get('/', function(req, res){
  res.render('home', {posts: posts});
});

app.get('/about', function(req, res){
  res.render('about', {aboutContent: aboutContent});
});

app.get('/contact', function(req, res){
  res.render('contact', {contactContent: contactContent});
});

app.get('/posts/:postTitle', function(req, res){
  const requestedTitle = _.lowerCase([string=req.params.postTitle]);
  posts.forEach(function(post){
    var postTitle = _.lowerCase([string=post.title]);
    if(postTitle === requestedTitle){
      res.render('post', {post: post});
    }
  });
});

app.get('/compose', function(req, res){
  res.render('compose');
});

app.post('/compose', function(req, res){
  let newPost = {
    'title': req.body.titleData,
    'post': req.body.postData
  };
  posts.push(newPost);
  res.redirect('/');
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
