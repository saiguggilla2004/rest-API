const express=require("express");
const app=express();
const { v4: uuidv4 } = require('uuid');

const path=require("path");
const port=3000;
app.use(express.json());
app.use(express.urlencoded({extended : true}));
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
let posts=[
           {
            id:uuidv4(),
            name:"sai guggilla",
            post:"this is the sample post description"
           },
           {
            id:uuidv4(),
            name:"manikumar",
            post:"eat more and more to gain weight"
           },
           {
            id:uuidv4(),
            name:"anil rathod",
            post:"another post from the anil kumar"
           }

];
app.listen(port,()=>{
    console.log("server is listening to the port "+port);
});
app.get("/",(req,res)=>{
    console.log("request accepted");
    res.send("this is the sample response");
})
app.get("/posts",(req,res)=>{
    console.log("to view all posts request accepted");
    res.render("index.ejs",{posts});

})
app.get("/posts/new",(req,res)=>{
    console.log("new post request is accepted");
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    console.log("post request to the new post is accepted");
    console.log(req.body);
    const id=uuidv4();
    let {name,post}=req.body;
    posts.push({id,name,post});
    res.redirect("/posts");
    res.send("the new post is uploaded");
    
});
app.get("/posts/:id",(req,res)=>{
      let {id} = req.params; 
       let post=posts.find((p)=> {  if(id===p.id ){return true;}
     });
       console.log(post);
       res.render("show.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
    console.log("patch request  is accepted");
    let {id}=req.params;
    console.log(id);
   console.log(req.body);
let post=posts.find((p)=>{
    if(id==p.id)
    {
        return true;
    }
});
   let newpost=req.body.post;
   post.post=newpost;
   console.log(post)
    res.redirect("/posts")

})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let post=posts.find((p)=>{
        if(id==p.id)
        {
            return true;
        }
    });
    res.render("edit.ejs",{post});
})
app.delete("/posts/:id",(req,res)=>{
    console.log("delete request is accepted");
    let {id}=req.params;
    posts=posts.filter((p)=>   p.id!==id   );
    res.redirect("/posts");
   
});



