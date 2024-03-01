const router = require("express").Router();

const UserController=require('../controllers/UserController')

  
router.post("/createUser", UserController.createUser);
  
router.post("/loginValidation", UserController.loginValidation);
  

module.exports = router;