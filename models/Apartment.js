const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const ApartmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  bills: [
    {
      month: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      },
      bill: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    }
  ],
  people: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ]
});

module.exports = Apartment = mongoose.model("apartments", ApartmentSchema);
