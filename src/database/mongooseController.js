const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const URI_DB = '';

mongoose.connect(URI_DB, {useNewUrlParser:true}, ()=>{
  console.log('Succesful connection!');
});

const publicationSchema = Schema({
  publication: {type: ObjectId},
  author: {type: String},
  date: {type: Date},
  message: {type: String},
  comments: [{autor: {type: String}, commentMessage: {type: String}, commentDate: {type: Date}}],
  themes: [{type: ObjectId, ref:'Type'}],
});

const typeSchema = Schema({
  type: {type: ObjectId},
  title: {type: String},
  publicationsRelated: [{type: ObjectId, ref:'Publication'}]
});



const Publication = mongoose.model('Publication', publicationSchema);
const Type = mongoose.model('Type', typeSchema);

module.exports = {Publication, Type};
