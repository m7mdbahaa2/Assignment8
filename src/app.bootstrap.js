import { NODE_ENV, port } from "../config/config.service.js";
import { noteModel } from "./DB/model/notes.model.js";
import { userModel } from "./DB/model/user.model.js";
import { authRouter, userRouter } from "./modules/index.js";
import express from "express";
import { noteRouter } from "./modules/note/index.js";

function bootstrap() {
  const app = express();
  //convert buffer data
  app.use(express.json());
  userModel;
  noteModel;

  //application routing
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/note", noteRouter);

  //invalid routing
  app.use("{/*dummy}", (req, res) => {
    return res.status(404).json({ message: "Invalid application routing" });
  });

  //error-handling
  app.use((error, req, res, next) => {
    const status = error.cause?.status ?? 500;
    return res.status(status).json({
      error_message:
        status == 500
          ? "something went wrong"
          : (error.message ?? "something went wrong"),
      stack: NODE_ENV == "development" ? error.stack : undefined,
    });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}
export default bootstrap;
