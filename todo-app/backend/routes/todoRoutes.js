const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// Create a new todo
router.post("/", async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
    });
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// Get todos with pagination
router.get("", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const todos = await Todo.find().skip(skip).limit(limit);
    const total = await Todo.countDocuments();
    res.json({ todos, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// // Get a single todo by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const todo = await Todo.findById(req.params.id);
//     res.json(todo);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch todo" });
//   }
// });

// Update a todo by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, description: req.body.description },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todoId = req.params.id;

    // Find the todo by ID and delete it
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    // If no todo is found, return a 404 error
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Return a success message
    res
      .status(200)
      .json({ message: "Todo successfully deleted", todo: deletedTodo });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// routes/todos.js or wherever your routes are defined

// GET /api/todos/:id - Get a specific todo by ID
router.get("/:id", async (req, res) => {
  try {
    const todoId = req.params.id;

    // Find the todo by ID
    const todo = await Todo.findById(todoId);

    // If no todo is found, return a 404 error
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Return the todo details
    res.status(200).json(todo);
  } catch (error) {
    console.error("Error fetching todo:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
