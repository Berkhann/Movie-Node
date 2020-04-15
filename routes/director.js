var express = require('express');
var router = express.Router();

//Models

const Director = require('../models/Director')


router.post('/', function(req, res, next) {
  const director = new Director(req.body);
  const promise = director.save();
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err);
  });
});

router.get('/',(req,res)=>{
  const promise = Director.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField:'_id',//director tablosunda hangi alanla eslestirecek
        foreignField:'director_id',
        as: 'movies'
      }
    },
      {
        $unwind:{
          path:'$movies',
          preserveNullAndEmptyArrays:true//filmi olmayan yönetmenlerinde gelmesini sağlar
        }
      },
      {
        $group://bir yöneticinin filmlerinin tektek değilde. Kendi altında bir kere gelmesini groupla sağlarız.
        {
          _id:{
            _id:'$_id',
            name:'$name',
            surname:'$surname',
            bio:'$bio'
          },
          movies: {
            $push:'$movies'
          }
        }
      },
      {
        $project: {//datanın nasıl gösterilecegini ayarlamamızı sağlıyor
          _id:'$_id._id',
          name:'$_id.name',
          surname:'$_id.surname',
          movies: '$movies'
        }
      }
    ]);

    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    });
});

module.exports = router;