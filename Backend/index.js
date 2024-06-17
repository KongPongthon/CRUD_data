const express = require('express')
const app = express();
const cors = require('cors');
const Data = require('./modules/Data')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')


// app.use(cors())
app.use(express.json())
app.use(cors({credentials:true,origin:process.env.Url_Cors}))
mongoose.connect(process.env.Url_Mongodb)


app.post('/data', async (req,res) =>{
    const {name,lastname,nickname,date,age,sex} = req.body;
    const dataDoc = await Data.create({name,lastname,nickname,date,age,sex})
    res.json(dataDoc);
})

app.get('/dataall', async (req,res)=>{
    res.json(await Data.find().sort({name:+1}))
})
app.get('/dataall/:id', async(req,res)=>{
    const {id} = req.params;
    const dataDoc = await Data.findById(id);
    res.json(dataDoc);
})


app.put('/dataP', async (req,res)=>{
    const {name,lastname,nickname,date,age,sex,id} = req.body;
    const dataDoc = await Data.findById(id)
    await dataDoc.updateOne({
        name,
        lastname,
        nickname,
        date,
        age,
        sex
    })
    res.json(dataDoc)
})

app.delete('/dataD/:id',async(req,res)=>{
    const {id} = req.params;
    res.json(await Data.deleteOne({_id:id}))
})

app.listen(4000,()=>{
    console.log("run port 4000")
});
