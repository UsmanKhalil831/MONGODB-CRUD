const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const User = require("./models/user");
const DbURL = "mongodb+srv://Usman813:81jVk45x0LR0ULGo@cluster0.z41602u.mongodb.net/?retryWrites=true&w=majority"//ye driver se uthaengay connect men ja kar


mongoose.connect(DbURL)
.then(()=>console.log("Database connected...."))
.catch((err)=> console.log(err));

app.get('/', async(req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }
    catch (error){
        console.log("users"),res.send("semething went wrong...");
    }
});

app.post('/', async(req,res)=>{
    try{
        const userr = await User.create(req.body);
        res.json(userr);
    }
    catch (error){
        console.log("users"),res.send("semething went wrong...");
    }
});

// app.put('/:id', async(req,res)=>{

//     try{
//         const UserId = req.params.id;
//         const UpdatedUserdata = req.body;
//         const user = await User.findByIdAndUpdate(UserId, UpdatedUserdata,{
//             new:true
//         });
//         res.json({message: "user updated successfully",user});
//     }
//     catch (error){
//         console.log("users"),res.send("semething went wrong...");
//     }
// });

app.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndUpdate(id, req.body);
      res.json(user);
    } catch (error) {
      console.log("users");
      res.send("Something went wrong..");
    }
  });

app.delete('/:id', async(req,res)=>{
    const {id} = req.params;
    try{
        const user = await User.findByIdAndDelete(id);
        res.send('User deleted successfully');
    }
    catch (error){
        console.log("users"),res.send("semething went wrong...");
    }
});

app.listen(3000, ()=>{
    console.log('Server is running on 3000');
});