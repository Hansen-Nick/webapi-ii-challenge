const express = require('express')

const router = express.Router();

const db = require('../data/db')

router.get('/', (req, res) => {
  db.find()
    .then( posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({success: false, error: 'The posts information could not be retrieved'})
    })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then( posts => {
      if (posts.length > 0) {
        res.status(200).json({success: true, posts})
      } else {
        res.status(404).json({message: "The post with the specified ID does not exist."})
      }
    })
    .catch(err => res.status(500).json({success: false, message: 'The post information could not be retrieved'}))
})

router.get('/:id/comments', (req, res) => {
  const {id} = req.params;

  db.findCommentById(id)
    .then( posts => {
      if (posts.length > 0) {
        res.status(200).json({success: true, posts})
      } else {
        res.status(404).json({message: "The post with the specified ID does not exist"})
      }
    })
    .catch( err => {
      res.status(500).json({success: false, err})
    })
})

router.post('/', (req, res) => {
  postInfo = req.body

  db.insert(postInfo)
    .then( info => {
        res.status(201).json({success: true, info})
      })
    .catch( err => {
      res.status(400).json({success: false, errorMessage: "Please provide title and contents for the post."})
    })
})


router.post('/:id/comments', (req, res) => {
  const comment = {...req.body, post_id: req.params.id};
  const id = req.params.id

  db.findById(id)
    .then( post => {
      db.insertComment(comment)
        .then( comment => {
          if (req.body.text) {
          res.status(201).json({success: true, comment})
        } else {
          res.status(400).json({message: "Please provide text for comment"})
        }
       })
        .catch( err => {
          res.status(500).json({error: "There was an error while saving the comment to the database"})
        })
    })
    .catch( err => {
      res.status(404).json({message: "The post with the specified ID does not exist."})
    })
  })

module.exports = router