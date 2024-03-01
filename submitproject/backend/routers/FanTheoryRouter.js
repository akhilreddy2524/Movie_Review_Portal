const router = require("express").Router();

const FantheoryController = require("../controllers/FanTheoryController");

  
router.post("/addTheory/:movieid", FantheoryController.addtheory);

router.get("/movieTheories/:movieid",FantheoryController.getMoviesByTheory)

router.delete("/deleteTheory/:thoeryid",FantheoryController.deleteTheory)

router.put("/editTheory/:thoeryid", FantheoryController.editTheory)


  

module.exports = router;

