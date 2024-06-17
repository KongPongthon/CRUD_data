const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const DataSchema = new Schema({
    name: {type: String,required:true},
    lastname: {type: String,required:true},
    nickname: {type: String,required:true},
    date: {type: String,required:true},
    age: {type: Number,required:true},
    sex: {type: String,required:true},
})

const DataModel = model('Data',DataSchema);
module.exports = DataModel;