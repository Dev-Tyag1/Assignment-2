"use client";

import styled from "styled-components";
import { useState } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Home = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);

  return (
    <Container>
      <TodoList onTodoClick={setSelectedTodo} />
      <TodoForm todo={selectedTodo} onSave={() => setSelectedTodo(null)} />
    </Container>
  );
};

export default Home;
