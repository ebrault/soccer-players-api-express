const express = require('express')
const Nation = require('../models/nation')
const handle = require('../../lib/error_handler')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const router = express.Router()

router.get('/nations', (req, res) => {
  Nation.find()
    .then(nations => {
      return nations.map(nation => nation.toObject())
    })
    .then(nations => res.status(200).json({ nations: nations }))
    .catch(err => handle(err, res))
})

router.get('/nations/:id', (req, res) => {
  Nation.findById(req.params.id)
    .then(handle404)
    .then(nation => res.status(200).json({ nation: nation.toObject() }))
    .catch(err => handle(err, res))
})

router.post('/nations', (req, res) => {
  Nation.create(req.body.nation)
    .then(nation => res.status(201).json({ nation: nation.toObject() }))
    .catch(err => handle(err, res))
})

router.patch('/nations/:id', (req, res) => {
  Nation.findById(req.params.id)
    .then(handle404)
    .then(nation => {
      Object.keys(req.body.nation).forEach(key => {
        if (req.body.nation[key] === '') {
          delete req.body.nation[key]
        }
      })
      return nation.update(req.body.nation)
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

router.delete('/nations/:id', (req, res) => {
  Nation.findById(req.params.id)
    .then(handle404)
    .then(nation => nation.remove())
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

module.exports = router
