const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const UserModel = require('../models/user');
const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

usersRouter.route('/')
.get((req, res, next) => {
  UserModel.find({})
  .then(users => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, err => next(err))
  .catch(err => next(err))
})
.post((req, res, next) => {
  const { login, password } = req.body;
  if(login && password){
    const newPassword = crypto.createHash('sha256').update(password).digest('base64');
    UserModel.create({login, password:newPassword})
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    }, err => next(err))
    .catch(err => next(err))
  } else {
    res.statusCode = 403;
    res.end('Data is not full');
  }
})
.put((req, res, next) => {
  res.statusCode = 403
  res.end('PUT operation not supported')
})
.delete((req, res, next) => {
  UserModel.remove({})
  .then((users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, err => next(err))
  .catch(err => next(err))
})

usersRouter.route('/:userId')
.get((req, res, next) => {
  UserModel.findById(req.params.userId)
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  }, err => next(err))
  .catch(err => next(err))
})
.post((req, res, next) => {
  res.statusCode = 403
  res.end('POST operation not supported')
})
.put((req, res, next) => {
  if(req.body.password){
    req.body.password = crypto.createHash('sha256').update(req.body.password).digest('base64');
  }
  UserModel.findByIdAndUpdate(req.params.userId, {$set: req.body}, {new: true})
    .then((user) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(user)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.delete((req, res, next) => {
  UserModel.findByIdAndRemove(req.params.userId)
  .then((user) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(user)
  }, (err) => next(err))
  .catch((err) => next(err))
})

module.exports = usersRouter;