const express = require('express')
const passport = require('passport')
const League = require('../models/league')
const handle = require('../../lib/error_handler')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

router.get('/leagues', requireToken, (req, res) => {
  League.find()
    .then(leagues => {
      return leagues.map(league => league.toObject())
    })
    .then(leagues => res.status(200).json({ leagues: leagues }))
    .catch(err => handle(err, res))
})

router.get('/leagues/:id', requireToken, (req, res) => {
  League.findById(req.params.id)
    .then(handle404)
    .then(league => res.status(200).json({ league: league.toObject() }))
    .catch(err => handle(err, res))
})

router.post('/leagues', requireToken, (req, res) => {
  req.body.league.owner = req.user.id
  League.create(req.body.league)
    .then(league => res.status(201).json({ league: league.toObject() }))
    .catch(err => handle(err, res))
})

router.patch('/leagues/:id', requireToken, (req, res) => {
  delete req.body.league.owner
  League.findById(req.params.id)
    .then(handle404)
    .then(league => {
      requireOwnership(req, league)
      Object.keys(req.body.league).forEach(key => {
        if (req.body.league[key] === '') {
          delete req.body.league[key]
        }
      })
      return league.update(req.body.league)
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

router.delete('/leagues/:id', requireToken, (req, res) => {
  League.findById(req.params.id)
    .then(handle404)
    .then(league => {
      requireOwnership(req, league)
      league.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

module.exports = router
