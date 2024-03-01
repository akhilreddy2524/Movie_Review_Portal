const express=require("express");
const { default: mongoose } = require("mongoose");
const app=express()
const path = require("path");
const MovieRouter = require("./routers/MovieRouter");
const UserRouter = require("./routers/UserRouter");
const ReviewRouter=require("./routers/ReviewRouter");
const FanTheoryRouter=require("./routers/FanTheoryRouter")
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

address="mongodb+srv://revanth2498:revanth2498@cluster0.dh16zas.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(address).then(()=>{
    console.log("connected db using mongoose")
}
).catch(err=>{
    console.log(err.description)
})

app.use("/Movie", MovieRouter);
app.use("/User", UserRouter);
app.use("/Review",ReviewRouter);
app.use("/FanTheory",FanTheoryRouter)


app.listen(8000,()=>{
    console.log(`Server going on port 8000`)
});

