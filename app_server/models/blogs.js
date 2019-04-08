var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
 blogTitle: {type: String, required: true },
 blogText: {type: String, required: true},
 dateOfCreation: { type: Date, "default": Date.now }
});

mongoose.model('blog', blogSchema);
