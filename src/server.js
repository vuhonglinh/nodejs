require("dotenv").config(); //Thiết lạp file env
const express = require("express");
const path = require("path");
const configViewEngine = require("./config/viewEngine"); //Path
const webRouter = require("./routes/web.js"); //Route
const apiRouter = require("./routes/api.js"); //Route Api
const connection = require("./config/database");
const fileUpload = require('express-fileupload');


const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
// config file upload
app.use(fileUpload());
///Config res.body
app.use(express.json());
app.use(express.urlencoded({ express: true }));

//config view engine
configViewEngine(app);

//Khai báo route riêng biệt
app.use("/", webRouter);
app.use("/v1/api", apiRouter);

(
  //Test Connection
  async () => {
    try {
      // await connection();
      
      app.listen(port, () => {
        console.log(`Backen rezo app listening on port ${port}`);
      });
    } catch (error) {
      console.log(`Error connect to database: ${error.message}`);
    }
  }
)();
