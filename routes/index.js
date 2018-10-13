const express = require('express')
const router = express.Router()
const {PagesController} = require('../controller/Pages')

/* GET home page. */
router
    .get('/', PagesController.index)
    .get('/w2', PagesController.w2)

module.exports = router