const router = require("express").Router();

const MovieController = require("../controllers/MovieController");

router.delete("/deleteMovie/:movieid",MovieController.deleteMovie);
  
router.put("/updateMovie", MovieController.updateMovie);
  
router.post("/addMovie", MovieController.addMovie);
  
router.get("/getMovies", MovieController.getMovies);
  

module.exports = router;

