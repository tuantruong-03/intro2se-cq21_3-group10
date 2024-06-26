const express = require('express');
const router = express.Router();
const siteController = require('../controllers/site.controller');
const { requireAuth} = require('../middleware/auth.middleware');
const studentController = require('../controllers/student.controller')
const teacherController = require('../controllers/teacher.controller')
const adminController = require('../controllers/admin.controller')
const jwt = require('jsonwebtoken');
const db = require('../database/db')

router.get('/logout', siteController.logout_get)
router.get('/login', siteController.login_get);
router.post('/login', siteController.login_post);
router.get('/password_change', siteController.password_change_get)
router.post('/password_change', siteController.password_change_post)
router.get('/',  (req, res) => {
    const token = req.cookies.jwt;
    if (req.url === '/login') {
        next();
    }
    else if (token) {
        jwt.verify(token, 'mySecretKey', async (err, decodedToken) => {
            if (err) {
                res.redirect('/login')
            } else {
                const user_id = decodedToken.user_id;
                const user = await db.getUserWithAccountId(user_id);
               
                if (user.user_role.includes('student')) { 
                    studentController.home(req,res)
                }
                else if (user.user_role.includes('teacher')) {
                    teacherController.home(req,res)
                }
                else if (user.user_role.includes('admin')) {
                    adminController.home(req,res)
                }
                else {
                    res.redirect('/login');
                }
            }
        })
    }
    else {
        res.redirect('/login');
    }
})

module.exports = router;