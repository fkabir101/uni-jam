const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description : {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  limit: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: Array,
    required: true
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  start :{
    type: String,
    required: true
  },
  startUnix:{
    type: String,
    required: true
  },
  end : {
    type: String,
    required: true
  },
  streamLink : {
    type: String,
  },

});

const Event = mongoose.model("Event",EventSchema);
EventSchema.index('name')
module.exports = Event;