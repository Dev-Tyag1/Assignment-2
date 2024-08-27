'use client';

import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

const FormContainer = styled.div`
  flex: 1;
  padding: 20px;
  border-left: 1px solid #ddd;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 100px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const TodoForm = ({ todo, onSave }) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const handleSubmit = async (e) => {
  e.preventDefault();
  const newTodo = { title, description, date: new Date() };
  try {
      if (todo) {
          await axios.put(`http://localhost:5000/api/v1/${todo._id}`, newTodo);
      } else {
          await axios.post('http://localhost:5000/api/v1', newTodo);
      }
        onSave();
        // alert(`Your item has been saved`)
        // window.location.reload();
  } catch (error) {
      console.error('Failed to save todo:', error);
  }
};

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">Save Todo</Button>
      </form>
    </FormContainer>
  );
};

export default TodoForm;


// 'use client';

// import styled from 'styled-components';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const FormContainer = styled.div`
//   flex: 1;
//   padding: 20px;
//   border-left: 1px solid #ddd;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 10px;
//   font-size: 16px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 10px;
//   height: 100px;
//   margin-bottom: 10px;
//   font-size: 16px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// `;

// const Button = styled.button`
//   padding: 10px 15px;
//   background-color: #0070f3;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background-color: #005bb5;
//   }
// `;

// const TodoForm = ({ todo, onSave }) => {
//   const [title, setTitle] = useState(todo?.title || '');
//   const [description, setDescription] = useState(todo?.description || '');

//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newTodo = { title, description, date: new Date() };
//     try {
//       if (todo) {
//         // Update existing todo
//         await axios.put(`http://localhost:5000/api/v1/${todo._id}`, newTodo);
//       } else {
//         // Create new todo
//         await axios.post('http://localhost:5000/api/v1', newTodo);
//       }
//       onSave(); // Callback to refresh the todo list
//     } catch (error) {
//       console.error('Failed to save todo:', error);
//     }
//   };

//   return (
//     <FormContainer>
//       <form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <TextArea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <Button type="submit">Save Todo</Button>
//       </form>
//     </FormContainer>
//   );
// };

// export default TodoForm;
