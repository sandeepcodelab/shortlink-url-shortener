import app from "./app.js";
import DBconnect from "./db/DBconnection.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3001;

DBconnect()
  .then(
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    })
  )
  .catch((error) => {
    console.log("Database connection fail : ", error);
  });
