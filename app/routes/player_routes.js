const express = require('express')
const Player = require('../models/player.js')
const handle = require('../../lib/error_handler.js')
const customErrors = require('../../lib/custom_errors.js')
const handle404 = customErrors.handle404
const router = express.Router()

router.get('/players', (req, res) => {
  Player.find()
    .then(players => {
      return players.map(player => player.toObject())
    })
    .then(players => res.status(200).json({ players: players }))
    .catch(err => handle(err, res))
})

router.get('/players/:id', (req, res) => {
  Player.findById(req.params.id)
    .then(handle404)
    .then(player => res.status(200).json({ player: player.toObject() }))
    .catch(err => handle(err, res))
})

router.post('/players', (req, res) => {
  Player.create(req.body.player)
    .then(player => res.status(201).json({ player: player.toObject() }))
    .catch(err => handle(err, res))
})

router.patch('/players/:id', (req, res) => {
  Player.findById(req.params.id)
    .then(handle404)
    .then(player => {
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

router.delete('/players/:id', (req, res) => {
  Player.findById(req.params.id)
    .then(handle404)
    .then(player => player.remove())
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

module.exports = router
