const appError = require("../utils/appError");
const connection = require("../services/db");

exports.getAllTodos = (req, res, next) => {
  connection.query("SELECT * FROM todolist", (err, data, fields) => {
    if (err) return next(new appError(err));
    res.status(200).json({ status: "success", length: data?.length, data });
  });
};

exports.createTodo = (req, res, next) => {
  if (!req.body) return next(new appError("No form data found", 404));
  const values = [req.body.name, "pending"];
  connection.query(
    "INSERT INTO todolist (name, status) VALUES(?)",
    [values],
    (err, data, fields) => {
      if (err) return next(new appError(err, 500));
      res.status(201).json({ status: "success", message: "Todo created" });
    }
  );
};

exports.getTodo = (req, res, next) => {
  if (!req.params.id) return next(new appError("No id found", 404));
  connection.query(
    "SELECT * FROM todolist WHERE id=?",
    [req.params.id],
    (err, data, fields) => {
      if (err) return next(new appError(err, 500));
      res.status(200).json({ status: "success", length: data?.length, data });
    }
  );
};

exports.completeTodo = (req, res, next) => {
  if (!req.params.id)
    return next(new appError("No todo id found for update", 404));
    return next(new appError("No todo id found for update", 404));
    connection.query(
    "UPDATE todolist SET status='completed' WHERE id=?",
    [req.params.id],
    (err, data, fields) => {
      if (err) return next(new appError(err, 500));
      res.status(201).json({ status: "success", message: "Todo completed" });
    }
  );
};

exports.updateTodo = (req, res, next) => {
  if (!req.params.id)
    return next(new appError("No todo id found for update", 404));
  connection.query(
    "UPDATE todolist SET name=? WHERE id=?",
    [req.body.name, req.params.id],
    (err, data, fields) => {
      if (err) return next(new appError(err, 500));
      res.status(201).json({ status: "success", message: "Todo updated" });
    }
  );
};

exports.deleteTodo = (req, res, next) => {
  if (!req.params.id)
    return next(new appError("No todo id found for delete", 404));
  connection.query(
    "DELETE FROM todolist WHERE id=?",
    [req.params.id],
    (err, fields) => {
      if (err) return next(new appError(err, 500));
      res.status(201).json({ status: "success", message: "Todo deleted" });
    }
  );
}