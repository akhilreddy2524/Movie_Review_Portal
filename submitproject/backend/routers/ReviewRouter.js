const router = require("express").Router();

const ReviewController = require("../controllers/ReviewController");


  
router.post("/addReview/:movieid", ReviewController.addReview);

router.get("/movieReviews/:movieid",ReviewController.getMoviesByReview)

router.delete("/deleteReview/:reviewid",ReviewController.deleteReview)

router.put("/editReview/:reviewid", ReviewController.editReview)

  

  

module.exports = router;

