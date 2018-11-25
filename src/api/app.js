const express = require('express');
const cors = require('cors');
const {Publication, Type} = require('../database/mongooseController');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/',(req,res)=>{
  res.status(200).send('Welcome to my Blog API!')
});

// ------------------ Publication CRUD ------------------

//Create ONE

app.post('/api/publications/',(req,res)=>{
  const {author,date,message,comments,themes} = req.body;
  const publicationInsert = Publication({
    author: author,
    date: date,
    message: message,
    comments: comments,
    themes: themes
  });
  publicationInsert.save((err,directorInsert)=>{
    if(err){
      res.status(401).send(err.errors.name.message);
    } else {
      res.status(200).send(publicationInsert);
    }
  })
});

// GET ALL

app.get('/api/publications',(req,res)=>{
  Publication.find()
             .exec()
             .then(publicationsList=>{
               res.status(200).send(publicationsList)
             })
             .catch(err => res.status(400).send(err));
});

// GET ONE

app.get('/api/publications/:id/', (req,res)=>{
  const {id} = req.params;
  Publication.findById(id)
             .exec()
             .then(publication=>{
               res.status(200).send(publication)
             })
             .catch(err=>{
               res.status(404).send(err)
             })
});

// UPDATE ONE

app.put('/api/publications/:id/', (req,res)=>{
  const {id} = req.params;
  Publication.findByIdAndUpdate(id,{$set: req.body},{new: true})
  .exec()
  .then(updatedPublication=>{
    res.status(200).send(updatedPublication)
  })
  .catch(err=>{
    res.status(400).send(err)
  })
});

// DELETE ONE

app.delete('/api/publications/:id',(req, res)=>{
  const {id} = req.params;
  Publication
  .findByIdAndDelete(id)
  .exec()
  .then(()=> res.status(200).send({"message": "Publication Deleted!"}))
  .catch(err=>res.status(400).send(err))
});

// --------------- Themes CRUD -----------------//

// CREATE ONE

app.post('/api/themes/',(req,res)=>{
  const {title, publicationsRelated} = req.body;
  const typeInsert = Type({
    title: title,
    publicationsRelated: publicationsRelated
  })
  typeInsert.save((err,typeInsert)=>{
    err ? res.status(400).send(err)
        : res.status(201).send(typeInsert)
  })
});

// GET ALL

app.get('/api/themes/',(req,res)=>{
  Type
  .find()
  .populate('publicationsRelated')
  .exec()
  .then(themesList=>{
    res.status(200).send(themesList)
  })
  .catch(err=>{
    res.status(400).send(err)
  })
});

// GET ONE

app.get('/api/themes/:id',(req,res)=>{
  const {id} = req.params;
  Type.findById(id)
      .exec()
      .then(type=>{
        res.status(200).send(type);
      })
      .catch(err=>{
        res.status(404).send(err)
      })
});

// UPDATE ONE

app.put('/api/themes/:id',(req,res)=>{
  const {id} = req.params;
  Type.findOneAndUpdate({_id:id},{$set: req.body},{new:true})
      .exec()
      .then(updateType=>{
        res.status(200).send(updateType)
      })
      .catch(err=>{
        res.status(400).send(err)
      })
});

// DELETE ONE

app.delete('/api/themes/:id',(req,res)=>{
  const {id} = req.params;
  Type.findByIdAndDelete(id)
      .exec()
      .then(()=> res.status(204).send({"message": "Theme Removed!"}))
      .catch(err=> res.status(404).send(err))
});

app.listen(PORT, ()=>{
  console.log(`App listening on port ${PORT}!`)
});
