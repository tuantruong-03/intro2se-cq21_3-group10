const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller')
const { requireAuth} = require('../middleware/auth.middleware');

router.get('/course', studentController.course);
router.get('/home', studentController.home);
router.get('/submission', studentController.submission);
router.post('/upload',studentController.upload);
router.post('/removeFile',studentController.removeFile);

module.exports = router;