'use client';

import styled from 'styled-components';
import axios from 'axios';
import TodoItem from './TodoItem';
import { useEffect, useState } from 'react';

const ListContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #f7f7f7;
`;

// const TodoItem = styled.li`
//   padding: 10px;
//   background-color: white;
//   margin-bottom: 10px;
//   border-radius: 4px;
//   cursor: pointer;
//   list-style: none;
//   border: 1px solid #ddd;

//   &:hover {
//     background-color: #f0f0f0;
//   }
// `;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 5px 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #005bb5;
  }
`;

const TodoList = ({ onTodoClick }) => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const url = `http://localhost:5000/api/v1?page=${currentPage}`;
  const [selectedTodo, setSelectedTodo] = useState(null);
  //  const handleSelect = async (id) => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/v1/${id}`);
  //     setSelectedTodo(response.data);
  //   } catch (error) {
  //     console.error('Error fetching todo details:', error);
  //   }
  // };
  // const handleDelete = (id) => {setTodos(todos.filter(todo => todo._id !== id)); };
//   const handleSelect = (todo) => {
//     onTodoSelect(todo); // Pass the selected todo to the parent or a higher-level state
//  };

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(url);
      setTodos(response.data.todos);
      setTotalPages(response.data.totalPages);
    };

    fetchTodos();
   
  }, [todos]);
  const handleSelect = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/${id}`);s
      setSelectedTodo(response.data);
    } catch (error) {
      console.error('Error fetching todo details:', error);
    }
  };
  return (
    <ListContainer>
      <ul>
  
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          // onDelete={handleDelete}
        onSelect={handleSelect}
        />
        ))}
    </ul>
        {selectedTodo && (
        <div style={{ flex: 1, padding: '20px', borderLeft: '1px solid #ddd' }}>
          <h3>{selectedTodo.title}</h3>
          <p>{selectedTodo.description}</p>
          <p><strong>Date:</strong> {new Date(selectedTodo.date).toLocaleString()}</p>
        </div>
      )}
      <PaginationContainer>
        <PaginationButton
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>
        <PaginationButton
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </PaginationContainer>
    </ListContainer>
  );
};

export default TodoList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import TodoItem from './TodoItem';

// const TodoList = ({ onSelect }) => {
//   const [todos, setTodos] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchTodos = async () => {
//     try {
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos?page=${currentPage}`);
//       setTodos(response.data.todos);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error('Failed to fetch todos:', error);
//     }
//   };

//   const handleDelete = (id) => {
//     setTodos(todos.filter(todo => todo._id !== id));
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, [currentPage]);

//   return (
//     <div>
//       {todos.map(todo => (
//         <TodoItem
//           key={todo._id}
//           todo={todo}
//           onDelete={handleDelete}
//           onSelect={onSelect}
//         />
//       ))}
//       {/* Pagination controls could be added here */}
//     </div>
//   );
// };

// export default TodoList;
