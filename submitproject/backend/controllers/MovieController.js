const Movie = require("../models/Movie");
const Persons=require("../models/Person")

const addMovie = async (req, res) => {
  const movieBody = req.body;
  console.log(movieBody)
  let directorId, actorIds = [];
  let writerIDs=[]
  try {
    director = await Persons.findOne({ name: movieBody.DirectorName }); 
  } catch (error) {
    return res.status(500).json({ message: 'Error finding director' });
  }

  if (!director) {
    try {
      director = await new Persons({ name: movieBody.DirectorName }).save();
    } catch (error) {
      return res.status(500).json({ message: 'Error creating director' });
    }
  }
  directorId = director._id;
  if (movieBody.actors && Array.isArray(movieBody.actors)) {
    for (const actorName of movieBody.actors) {
      let actor;

      try {
        actor = await Persons.findOne({ name: actorName }); 
      } catch (error) {
        return res.status(500).json({ message: 'Error finding actor' });
      }

      if (!actor) {
        try {
          actor = await new Persons({ name: actorName }).save();
        } catch (error) {
          return res.status(500).json({ message: 'Error creating actor' });
        }
      }

      actorIds.push(actor._id);
    }
  }

  if (movieBody.Writer && Array.isArray(movieBody.Writer)) {
    for (const writerName of movieBody.Writer) {
      let writer;

      try {
        writer = await Persons.findOne({ name: writerName }); 
      } catch (error) {
        return res.status(500).json({ message: 'Error finding writer' });
      }

      if (!writer) {
        try {
          writer = await new Persons({ name: writerName }).save();
        } catch (error) {
          return res.status(500).json({ message: 'Error creating writer' });
        }
      }

      writerIDs.push(writer._id);
    }
  }


  movieBody.Director = directorId; 
  movieBody.actors = actorIds; 
  movieBody.Writer=writerIDs;
  console.log(movieBody)
  const existsMovie = await Movie.findOne({
    Title: movieBody.Title,
    Year: movieBody.Year,
    language: movieBody.language,
    Country: movieBody.Country,
  });

  console.log(existsMovie)
  if (existsMovie) {
    return res.status(401).json({ message: 'Movie already exists' });
  }

  const movie = new Movie(movieBody);

  try {
    await movie.save();
    console.log(movie)
    res.status(200).json({ message: 'Movie created' });
  } catch (err) {
    console.error(err.toString());
    return res.status(500).json({ message: 'Error adding movie' });
  }
};





  
  const updateMovie = async (req, res) => {
    const payload = req.body;
    const course = await Course.findOne({ code: payload.code });
    if (!course) {
      res.status(401).send({ message: "Course not found" });
    }
    try {
      const temporary = await new Temporary(coursePayload);
      temporary.save();
  
      const request = await new Request({
        courseCode: payload.code,
        requestType: "Updation",
        instructorId: coursePayload.instructorId,
      });
      console.log(restoupdate);
      await request.save();
      res.status(200).send({ message: "Request sent" });
      return;
    } catch (err) {
      console.log(err);
      return res.json(Response.Error("Error updating course"));
    }
  };
  
  const deleteMovie = async (req, res) => {
    try {
      const movieid = req.params.movieid;
      const deletedMovie = await Movie.findOneAndDelete({_id:movieid});
      console.log(deletedMovie)
      res.status(200).send({ message: "Movie Deleted" });
    } catch (err) {
      console.log(err.toString());
      return res.json(Response.Error("Error deleting course"));
    }
  };
  


  const getMovies = async (req, res) => {
    try {
      console.log(req.query.page)
      console.log(req.query.limit)
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10; 
      const skip = (page - 1) * limit;
      const requests = await Movie.find({}).sort({ _id: -1 }).skip(skip).limit(limit);
      res.status(200).send({ requests });
    } catch (e) {
      res.status(500).send({ message: 'Error fetching movies' });
    }
  }
  

  module.exports = {addMovie, deleteMovie, updateMovie, getMovies};
  