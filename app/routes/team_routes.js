const express = require('express')
const passport = require('passport')
const Team = require('../models/team')
const handle = require('../../lib/error_handler')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

router.get('/teams', requireToken, (req, res) => {
  Team.find()
    .then(teams => {
      return teams.map(team => team.toObject())
    })
    .then(teams => res.status(200).json({ teams: teams }))
    .catch(err => handle(err, res))
})

router.get('/teams/:id', requireToken, (req, res) => {
  Team.findById(req.params.id)
    .then(handle404)
    .then(team => res.status(200).json({ team: team.toObject() }))
    .catch(err => handle(err, res))
})

router.post('/teams', requireToken, (req, res) => {
  req.body.team.owner = req.user.id
  Team.create(req.body.team)
    .then(team => res.status(201).json({ team: team.toObject() }))
    .catch(err => handle(err, res))
})

router.patch('/teams/:id', requireToken, (req, res) => {
  delete req.body.team.owner
  Team.findById(req.params.id)
    .then(handle404)
    .then(team => {
      requireOwnership(req, team)
      Object.keys(req.body.team).forEach(key => {
        if (req.body.team[key] === '') {
          delete req.body.team[key]
        }
      })
      return team.update(req.body.team)
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

router.delete('/teams/:id', requireToken, (req, res) => {
  Team.findById(req.params.id)
    .then(handle404)
    .then(team => {
      requireOwnership(req, team)
      team.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

module.exports = router
