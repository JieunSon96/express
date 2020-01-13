const express=require('express');
const app=express();

const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://jeson:tpfk2407917!@reactwithnode-rko4o.mongodb.net/test?retryWrites=true&w=majority'
,{useNewUrlParser:true}).then(()=>console.log('DB Connected'))
                              .catch(err=>console.log(err));


app.get('/',(req,res)=>{
  res.send('hello world');
});

app.listen(6000);
