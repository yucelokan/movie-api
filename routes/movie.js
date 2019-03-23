const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movie')

router.get('/', (req, res, next) => {
  const promise = Movie.aggregate([
      {
        $lookup:{
            from: 'directors',
            localField: 'director_id',
            foreignField: '_id',
            as: 'director'
        }
      },
      {
        $unwind: {
            path: '$director',
            preserveNullAndEmptyArrays: true
        }
      }/*,
      {
          $project: {
              _id: '$_id._id',
              title: '$_id.title',
              category: '$_id.category',
              country: '$_id.country',
              imdb_score: '$_id.imdb_score',
              year: '$_id.year',
              director_id: '$_id.director_id',
              director:  '$director'
          }
      }*/
  ])

  promise.then((data) =>{
    if (data.length == 0)
      next({ url: req.url, message: 'The movies were not found.', code: 99})

    res.json(data)
    
  }).catch((err) => {
    console.log('url: ',req.url)
    console.log('error: ', err.message)
  })
})

router.get('/top10', (req, res, next) => {

  const promise = Movie.find({ }).sort({imdb_score: -1}).limit(10)

  promise.then((data) =>{
    if (data.length == 0)
      next({ url: req.url, message: 'The movies were not found.', code: 99})

    res.json(data)
    
  }).catch((err) => {
    res.json(err)
  })
})

router.get('/:movie_id', (req, res, next) => {
 
  const id = req.params.movie_id
  const promise = Movie.findById(id)

  promise.then((movie) => {

    if (!movie)
      next({ url: req.url, message: 'The movie was not found.', code: 99})
    
    res.json(movie)
  
  }).catch((err) => {
    console.log('url: ',req.url)
    console.log('error: ',err.message)
  })
  
})

router.delete('/:movie_id', (req, res, next) => {
 
  const id = req.params.movie_id
  const promise = Movie.findByIdAndDelete(id)

  promise.then((movie) => { 

    if (!movie)
      next({url:req.url, message: 'The movie was not found.', code: 99})

    res.json({status: true})
    

  }).catch((err) => {
    console.log('url: ',req.url)
    console.log('error: ', err.message)
  })
  
})

router.put('/:movie_id', (req, res, next) => {
 
  const id = req.params.movie_id
  const reqBody = req.body
  const promise = Movie.findByIdAndUpdate(
    id,
    reqBody,
    {
      new: true
    })

  promise.then((movie) => {

    if (!movie)
      next({url: req.url, message: 'The movie was not found.', code: 99})

    res.json(movie)
    

  }).catch((err) => {
    console.log('url: ',req.url)
    console.log('error: ', err.message)
  })
  
})

router.get('/between/:start_year/:end_year', (req,res,next) => {

  const start_year = req.params.start_year
  const end_year = req.params.end_year

  const promise = Movie.find(
    {
      year : { "$gte": parseInt(start_year), "$lte": parseInt(end_year)} //>= <=
      //year : { "$gt": parseInt(start_year), "$lt": parseInt(end_year)} // > <
    }
    )
    
    promise.then((movie) => {
      if (movie.length == 0)
        next({url:req.url, message: 'The movie was not found.', code: 99})
        
      res.json(movie)
  
    }).catch((err) => {
      console.log('url: ',req.url)
      console.log('error: ', err.message)
    })

})

router.post('/', (req, res, next) => {
  //const {title, imdb_score, category, country, year} = req.body
  const movie = new Movie(req.body)

  const promise = movie.save()

  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })

  /*movie.save((err,data) => {
    if (err)
      res.json(err)

    res.json({status : true})
  })*/

});

module.exports = router;
