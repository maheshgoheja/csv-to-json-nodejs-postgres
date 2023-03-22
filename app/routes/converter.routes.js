const controller = require("../controllers/converter.controller.js");

const router = require('express').Router()

router.get('/convert', controller.converter)

module.exports = router