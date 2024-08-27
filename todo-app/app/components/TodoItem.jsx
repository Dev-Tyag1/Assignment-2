import styled from 'styled-components';
import axios from 'axios';


const TodoItemContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    background-color: #cc0000;
  }
`;

const TodoItem = ({ todo,}) => {

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/${todo._id}`);
    //  alert('Todo item successfully deleted.');
    //  window.location.reload();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <TodoItemContainer>
      <div >
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
      <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
    </TodoItemContainer>
  );
};

export default TodoItem;
