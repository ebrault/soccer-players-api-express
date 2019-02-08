const express = require('express')
const passport = require('passport')
const Nation = require('../models/nation')
const handle = require('../../lib/error_handler')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

router.get('/nations', requireToken, (req, res) => {
  Nation.find()
    .then(nations => {
      return nations.map(nation => nation.toObject())
    })
    .then(nations => res.status(200).json({ nations: nations }))
    .catch(err => handle(err, res))
})

router.get('/nations/:id', requireToken, (req, res) => {
  Nation.findById(req.params.id)
    .then(handle404)
    .then(nation => res.status(200).json({ nation: nation.toObject() }))
    .catch(err => handle(err, res))
})

router.post('/nations', requireToken, (req, res) => {
  req.body.nation.owner = req.user.id
  Nation.create(req.body.nation)
    .then(nation => res.status(201).json({ nation: nation.toObject() }))
    .catch(err => handle(err, res))
})

router.patch('/nations/:id', requireToken, (req, res) => {
  delete req.body.nation.owner
  Nation.findById(req.params.id)
    .then(handle404)
    .then(nation => {
      requireOwnership(req, nation)
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

router.delete('/nations/:id', requireToken, (req, res) => {
  Nation.findById(req.params.id)
    .then(handle404)
    .then(nation => {
      requireOwnership(req, nation)
      nation.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

module.exports = router
