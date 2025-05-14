const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/status", (req, res) => {
    res.send("Todo App is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});