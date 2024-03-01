const Movie =require("../models/Movie");
const Review=require("../models/Review");

const addReview = async (req, res) => {
    try{
        const idmovie = req.params.movieid;
        console.log(idmovie)
        const existsMovie=await Movie.findOne({_id:idmovie}) 
  const reviewBody = req.body;
console.log(existsMovie)
const review = new Review({...reviewBody,year:existsMovie.Year,movie:existsMovie.Title});
await review.save();
 console.log(review) 
 const reviewAttached=await Movie.updateOne({_id:idmovie},
        {$push: {reviews: review._id}},{returnOriginal: false})
    console.log(reviewAttached)
    res.status(200).json(review);
    }
 catch (err) {
    console.error(err.toString());
    return res.status(500).json({ message: 'Error adding Review' });
  }
};


const editReview = async (req, res) => {
    try {
      const reviewId = req.params.reviewid;
      const updatedReviewData = req.body; 
      const updatedReview = await Review.findByIdAndUpdate(reviewId, updatedReviewData, { new: true });
  
      if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      res.status(200).json(updatedReview);
    } catch (err) {
      console.error(err.toString());
      return res.status(500).json({ message: 'Error editing review' });
    }
  };
  

const deleteReview=async(req,res)=>{
    try{
        const reviewid=req.params.reviewid;
        console.log(reviewid)
        const review=await Review.findOneAndDelete({_id:reviewid})
        console.log(review)
        res.status(200).json({message:"Succesfully deleted"})
    }
    catch(err){
        console.error(err.toString());
    return res.status(500).json({ message: 'Error Deleting Review' });
    }
}


const getMoviesByReview=async(req,res)=>{   
    try {
        var idmovie = req.params.movieid;
        console.log(idmovie)
        const movieReviews=await Movie.findOne({_id:idmovie}).populate('reviews') 
        console.log(movieReviews.reviews)
        res.status(200).json(movieReviews.reviews);
        return;
    }
    catch (e) {
        console.log(e)
        res.status(500).send({ message: 'error' })
    }    
    };


module.exports = {addReview,getMoviesByReview,deleteReview,editReview};
