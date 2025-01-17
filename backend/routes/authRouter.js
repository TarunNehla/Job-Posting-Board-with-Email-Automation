const {GoogleLogin}  = require('../controllers/authController')

const router = require('express').Router();

router.get('/test', (req,res) => {
    res.send('check');
})

router.get('/google',GoogleLogin)


module.exports = router;