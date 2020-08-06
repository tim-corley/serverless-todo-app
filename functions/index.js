const functions = require("firebase-functions");
const app = require("express")();
const auth = require("./util/auth");

const {
  getAllTodos,
  getOneTodo,
  postOneTodo,
  deleteTodo,
  editTodo,
} = require("./apis/todos");

const {
  loginUser,
  signUpUser,
  uploadProfilePhoto,
  getUserDetail,
  updateUserDetails,
} = require("./apis/users");

// todos
app.get("/todos", auth, getAllTodos);
app.get("/todo/:todoId", auth, getOneTodo);
app.post("/todo", auth, postOneTodo);
app.delete("/todo/:todoId", auth, deleteTodo);
app.put("/todo/:todoId", auth, editTodo);

// users
app.post("/login", loginUser);
app.post("/signup", signUpUser);
app.post("/user/image", auth, uploadProfilePhoto);
app.get("/user", auth, getUserDetail);
app.post("/user", auth, updateUserDetails);

exports.api = functions.https.onRequest(app);
