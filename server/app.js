const express=require('express');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();

app.use(cors());

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//Routes
app.use('/users',require('./routes/users'));


mongoose.connect('mongodb+srv://jeson:tpfk2407917!@reactwithnode-rko4o.mongodb.net/test?retryWrites=true&w=majority'
,{useNewUrlParser:true}).then(()=>console.log('DB Connected'))
                              .catch(err=>console.log(err));

//Start the server
const port=process.env.PORT || 3005;

app.listen(port, () => {console.log(`Server Running on at ${port}`)
});
