const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

/*app.get("/", (req, res) => {
    res.send("Testování komunikace :)");
});*/

const port = process.env.PORT || 5000; //nastevení poru
const uri = process.env.ATLAS_URI;     //načtení uri z .env filu

app.listen(port, (req, res) => {
    console.log(`Server běží na portu ${port}`);
});

//připojení k mongu
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Spojení s MongoDB navázáno"))
.catch((error) => console.log ("Spojení s MongoDB selhalo: ", error.message))