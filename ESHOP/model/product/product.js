const mongoose = require('mongoose');

const productSchema = mongoose.Schema ({
    name:{
        type: String,
    required: [true, "Name is required"],
      },
    image:{
      type: String,
      required: [true, "some url"],
      },
      price:{
        type: String,
    required: [true, "price is required"],
      },
});

const product = mongoose.model ("Product", productSchema);
module.exports = product;