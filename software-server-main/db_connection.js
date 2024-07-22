const mongoose = require("mongoose");
// require("dotenv").config();
module.exports = () => {
  const mongoURI =
    "mongodb+srv://sn913929:nsKFt7cQqk0Vm7Ho@cluster0.7kwuynz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(mongoURI, connectionParams);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect database!");
  }
};
