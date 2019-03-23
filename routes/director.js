const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director')

router.get('/', (req,res) => {

    const promise = Director.aggregate([
        {
            $lookup:{
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies:{
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies:  '$movies'
            }
        }
    ])
    
    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log('url: ',req.url)
        console.log('error: ', err.message)
    })

})

router.get('/:director_id', (req, res, next) => {
 
  const id = req.params.director_id

  const promise = Director.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup:{
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies:{
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies:  '$movies'
            }
        }
    ])
    
    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log('url: ',req.url)
        console.log('error: ', err.message)
    })
  
})

router.get('/:director_id/best10movies', (req, res, next) => {
 
    const id = req.params.director_id
  
    const promise = Director.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup:{
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },{
            $sort:{
                'movies.imdb_score': -1
            }
        },
        {
            $limit: 10
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies:{
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies:  '$movies'
            }
        }
    ])
      
      promise.then((data) => {
          res.json(data[0])
      }).catch((err) => {
          console.log('url: ',req.url)
          console.log('error: ', err.message)
      })
    
  })

router.delete('/:director_id', (req, res, next) => {
 
  const id = req.params.director_id
  const promise = Director.findByIdAndDelete(id)

  promise.then((director) => { 

    if (!director_id)
      next({url:req.url, message: 'The director was not found.', code: 99})

    res.json({status: true})
    

  }).catch((err) => {
    console.log('url: ',req.url)
    console.log('error: ', err.message)
  })
  
})

router.put('/:director_id', (req, res, next) => {
 
  const id = req.params.director_id
  const reqBody = req.body
  const promise = Director.findByIdAndUpdate(
    id,
    reqBody,
    {
      new: true
    })

  promise.then((director) => {

    if (!director)
      next({url: req.url, message: 'The director was not found.', code: 99})

    res.json(director)
    

  }).catch((err) => {
    console.log('url: ',req.url)
    console.log('error: ', err.message)
  })
  
})

router.post('/', (req, res, next) => {
  //const {title, imdb_score, category, country, year} = req.body
  const director = new Director(req.body)

  const promise = director.save()

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
