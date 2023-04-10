const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema({
  tableNumber:{
    type: Number
  },
  seatingCapacity:{
    type: Number
  },
  status:{
    type: String
  },
  shape:{
    type: String
  },
  isCircular:{
    type: Boolean
  },
  isFamilyStyle:{
    type: Boolean
  },
  isGroupable:{
    type: Boolean
  }
});


const Table = mongoose.model("Table", tableSchema);

module.exports = Table;