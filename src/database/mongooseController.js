const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const URI_DB = 'mongodb://sergiopereo:joeapp2128@ds039027.mlab.com:39027/joe-app';

mongoose.connect(URI_DB, {useNewUrlParser:true}, ()=>{
  console.log('Succesful connection!');
});

const publicationSchema = Schema({
  publication: {type: ObjectId},
  author: {type: String},
  date: {type: Date},
  message: {type: String},
  comments: [String],
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
