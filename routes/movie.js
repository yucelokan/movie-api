const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movie')

router.get('/', (req, res, next) => {
  const promise = Movie.find({ })
  promise.then((data) =>{
    if (!data){
      next({ message: 'The movies were not found.', code: 99})
    }else{
      res.json(data)
    }
  }).catch((err) => {
    next({ message: 'The movies were not found.', code: 99})
    res.end()
  })
})

router.get('/:movie_id', (req, res, next) => {
 
  const id = req.params.movie_id
  const promise = Movie.findById(id)

  promise.then((movie) => {

    if (!movie){
      next({ message: 'The movie was not found.', code: 99})
    }else{
      res.json(movie)
    }

  }).catch((err) => {

    next({ message: 'The movie was not found.', code: 99})
    res.end()

  })
  
})

router.delete('/:movie_id', (req, res, next) => {
 
  const id = req.params.movie_id
  const promise = Movie.findByIdAndDelete(id)

  promise.then((movie) => { 

    if (!movie){
      next({ message: 'The movie was not found.', code: 99})
    }else{
      res.json({status: true})
    }

  }).catch((err) => {

    next({ message: 'The movie was not found.', code: 99})
    res.end()

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

    if (!movie){
      next({ message: 'The movie was not found.', code: 99})
    }else{
      res.json(movie)
    }

  }).catch((err) => {

    next({ message: 'The movie was not found.', code: 99})
    res.end()

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
