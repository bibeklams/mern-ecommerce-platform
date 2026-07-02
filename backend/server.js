import app from "./app.js";
import connectDb from "./config/db.js";

const port = process.env.PORT || 3000;

connectDb();

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
