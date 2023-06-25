import express from "express";
import morgan from "morgan";

import router from "./router";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/users";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

app.use("/api", protect, router);

app.post("/signup", createNewUser);
app.post("/signin", signIn);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "input error" });
  } else {
    res.status(500).json({ message: "server error" });
  }
});
export default app;
