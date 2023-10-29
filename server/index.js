const express = require("express");
const db = require("./config/dbConnect");
const app = express();
const auth = require("./routes/auth");
const transaction = require("./routes/transaction");
const profile = require("./routes/profile");
const openRoute = require("./routes/openRoute")
const cors = require("cors");


const cookieParser = require("cookie-parser");

require("dotenv").config();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)
db.connect(); 
app.use("/app/v1",openRoute);
app.use("/app/v1/auth", auth);
app.use("/app/v1/transaction", transaction);
app.use("/app/v1/profile", profile);

app.listen(port, () => {
  console.log(`Server Started at port no ${port}`);
});
