const Movie = require("../models/Movie");
const Fan_theories=require("../models/FanTheory")

const addtheory = async (req, res) => {
    try{
        const idmovie = req.params.movieid;
        console.log(idmovie)
        const existsMovie=await Movie.findOne({_id:idmovie}) 
  const theoryBody = req.body;
console.log(existsMovie)
const fantheory = new Fan_theories({...theoryBody,year:existsMovie.Year,movie:existsMovie.Title});
await fantheory.save();
 console.log(fantheory) 
 const fanTheoryAttached=await Movie.updateOne({_id:idmovie},
        {$push: {fan_theories: fantheory._id}},{returnOriginal: false})
    console.log(fanTheoryAttached)
    res.status(200).json(fantheory);
    }
 catch (err) {
    console.error(err.toString());
    return res.status(500).json({ message: 'Error adding Fantheory' });
  }
};


const editTheory = async (req, res) => {
    try {
      const theoryId = req.params.thoeryid;
      const updatedFanTheoryData = req.body; 
      const updatedtheory = await Fan_theories.findByIdAndUpdate(theoryId, updatedFanTheoryData, { new: true });  
      if (!updatedtheory) {
        return res.status(404).json({ message: 'Theory not found' });
      }  
      res.status(200).json(updatedtheory);
    } catch (err) {
      console.error(err.toString());
      return res.status(500).json({ message: 'Error editing theory' });
    }
  };
  

const deleteTheory=async(req,res)=>{
    try{
        const theoryId=req.params.thoeryid;
        console.log(theoryId)
        const theory=await Fan_theories.findOneAndDelete({_id:theoryId})
        console.log(theory)
        res.status(200).json({message:"Succesfully deleted"})
    }
    catch(err){
        console.error(err.toString());
    return res.status(500).json({ message: 'Error Deleting Review' });
    }
}


const getMoviesByTheory=async(req,res)=>{   
    try {
        const idmovie = req.params.movieid;
        console.log(idmovie)
        const movieTheories=await Movie.findOne({_id:idmovie}).populate('fan_theories') 
        console.log(movieTheories.fan_theories)
        res.status(200).json(movieTheories.fan_theories);
        return;
    }
    catch (e) {
        console.log(e)
        res.status(500).send({ message: 'error' })
    }    
    };


module.exports = {addtheory,getMoviesByTheory,deleteTheory,editTheory};
