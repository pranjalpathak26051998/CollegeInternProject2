const express = require('express')
const router = express.Router()
const { college, interns, collegeDetails } = require('../controllers/collegeController')


router.post("/functionup/colleges", college)
router.post("/functionup/interns", interns)
router.get("/functionup/collegeDetails",collegeDetails)

module.exports = router