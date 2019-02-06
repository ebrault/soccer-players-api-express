const express = require('express')
const passport = require('passport')
const Player = require('../models/player.js')
const handle = require('../../lib/error_handler.js')
const customErrors = require('../../lib/custom_errors.js')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

router.get('/players', requireToken, (req, res) => {
  Player.find()
    .then(players => {
      return players.map(player => player.toObject())
    })
    .then(players => res.status(200).json({ players: players }))
    .catch(err => handle(err, res))
})

router.get('/players/:id', requireToken, (req, res) => {
  Player.findById(req.params.id)
    .then(handle404)
    .then(player => res.status(200).json({ player: player.toObject() }))
    .catch(err => handle(err, res))
})

router.post('/players', requireToken, (req, res) => {
  req.body.player.owner = req.user.id
  Player.create(req.body.player)
    .then(player => res.status(201).json({ player: player.toObject() }))
    .catch(err => handle(err, res))
})

router.patch('/players/:id', requireToken, (req, res) => {
  delete req.body.player.owner
  Player.findById(req.params.id)
    .then(handle404)
    .then(player => {
      requireOwnership(req, player)
      Object.keys(req.body.player).forEach(key => {
        if (req.body.player[key] === '') {
          delete req.body.player[key]
        }
      })
      return player.update(req.body.player)
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

router.delete('/players/:id', requireToken, (req, res) => {
  Player.findById(req.params.id)
    .then(handle404)
    .then(player => {
      requireOwnership(req, player)
      player.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

module.exports = router
