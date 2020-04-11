var express = require('express');
var router = express.Router();

//Models
const Book = require('../models/Book');

router.post('/new', function(req, res, next) {//kayıt atar
  const book = new Book({
      title:'Udemy',
      published: false,
      comments: [
        {message:"HARİKA!"},
        {message:"SÜPER!"}],
      meta: {
        vetos:12,
        favs:104
      }
  });

  book.save((err,data)=>{
      if(err)
        console.log(err)
       
       res.json(data);
  });
});


router.get('/search',(req,res)=>{//buldugu tüm degerleri döner
  Book.find({published:false},(err,data)=>{
      res.json(data);
  });
});


router.get('/searchOne',(req,res)=>{//Buldugu il degeri doner
  Book.findOne({title:'Udemy'},(err,data)=>{
    res.json(data)
  })
});

router.put('/update',(req,res)=>{
    Book.update(
      {
        published:false
      },
      {
        published:true,
      },
      {
        multi:true //Tüm kayitlari true yapmak için
        //upsert:true//kriterelre uygun kayıt yoksa kayır atıyor
      },
      (err,data)=>{
        res.json(data);
      });
});


router.get('/sort',(req,res)=>{//sıralar. -- olursa büyükten küçüge sıralar
  Book.find({},(err,data)=>{
    res.json(data);
  }).sort({'meta.favs':1})
})

router.get('/aggregate',(req,res)=>{
  Book.aggregate([
    {
       $match:{
         published:true
       }
    }
  ],(err,result)=>{
    res.json(result)
  });
});



module.exports = router;