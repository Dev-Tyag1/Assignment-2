'use client';

import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ListContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #f7f7f7;
`;

const TodoItem = styled.li`
  padding: 10px;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
  list-style: none;
  border: 1px solid #ddd;

  &:hover {
    background-color: #f0f0f0;
  }
`;

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


  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(url);
      setTodos(response.data.todos);
      setTotalPages(response.data.totalPages);
    };

    fetchTodos();
  }, [todos]);

  return (
    <ListContainer>
      <ul>
      {todos.map((todo) => (
    <TodoItem key={todo._id} onClick={() => onTodoClick(todo)}>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
    </TodoItem>
))}

      </ul>
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
