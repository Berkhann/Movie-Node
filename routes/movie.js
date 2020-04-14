var express = require('express');
var router = express.Router();

//Models
const Movie = require('../models/Movie');


//End Points

router.get('/top10',(req,res)=>{
  const promise = Movie.find({ }).limit(10).sort({ imdb_score: -1 });

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});



router.delete('/:movie_id',(req,res,next)=>{//delete endpoint
  const promise = Movie.findByIdAndRemove(req.params.movie_id,req.body);//req.params içinde gelen parametreleri bulundurur

  promise.then((movie)=>{
    if(!movie)
      next({message: 'The movie was not found'});
    
    res.json({movie});
  }).catch((err)=>
  {
    res.json(err);
  });
});

router.put('/:movie_id',(req,res,next)=>{//update endpoint
  const promise = Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {
      new:true//update edildikten sonra yeni datanın dönülmesini saglar
    });//req.params içinde gelen parametreleri bulundurur

  promise.then((movie)=>{
    if(!movie)
      next({message: 'The movie was not found'});
    
    res.json({movie});
  }).catch((err)=>
  {
    res.json(err);
  });
});



router.get('/:movie_id',(req,res,next)=>{//id ile bulma endpoint
    const promise = Movie.findById(req.params.movie_id);//req.params içinde gelen parametreleri bulundurur

    promise.then((movie)=>{
      if(!movie)
        next({message: 'The movie was not found'});
      
      res.json(movie);
    }).catch((err)=>
    {
      res.json(err);
    });
});

router.get('/',(req,res)=>{//All movies
    const promise = Movie.find({ });

    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    });
});

router.post('/', function(req, res, next) {
  //const {title,imdb_score,category,country,year} = req.body;
  const movie = new Movie(req.body);
 /* movie.save((err,data)=>{
    if(err)
      res.json(err);

    res.json({status:1});
  });*/
  const promise = movie.save();
  promise.then((data)=>{
    res.json({status:1})
  }).catch((err)=>{
    res.json(err);
  });
});


module.exports = router;
