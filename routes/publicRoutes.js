const passport = require('passport')

const express = require('express')
const publicRouter = express.Router()

const publicController = require('../controller/publicArticleController')
publicRouter.get('/blogs', publicController.getAllPublishedBlogs)

module.exports = publicRouter