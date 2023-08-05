import React, { useState } from 'react';
import { Stack, Button, FormControl, TextField, Box, Container } from '@mui/material';
import TodoListTable from './components/TodoListTable';

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState({
    id: null,
    todo: '',
  });

  const handleInputChange = (event) => {
    const { value } = event.target;
    setNewTodo((prevValue) => ({
      ...prevValue,
      todo: value,
    }));
  };

  const handleSubmit = () => {
    const trimmedTodo = newTodo.todo.trim();

    if (trimmedTodo === '') {
      return;
    }

    const newTodoItem = {
      id: Date.now(),
      todo: trimmedTodo,
      checked: false,
    };
    setTodoList((prevTodoList) => [
      ...prevTodoList,
      newTodoItem,
    ]);
    setNewTodo({
      id: null,
      todo: '',
    });
  };

  const editTodo = updatedTodo => {
    const todoIndexFromTable = todoList.findIndex(todo => todo.id === updatedTodo.id);
    if (todoIndexFromTable === -1) {
      return;
    }
    const newTodoList = [...todoList];
    newTodoList[todoIndexFromTable] = updatedTodo;
    setTodoList(newTodoList);
  }

  const handleDeleteBtn = (row) => {
    const newTodoList = todoList.filter(todo => todo.id !== row.id);
    setTodoList(newTodoList);
  }

  const handleCheckTodo = (id) => {
    console.log(id);
    const newArr = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          checked: !todo.checked
        };
      }
      return todo;
    });
    setTodoList(newArr);
  };

  return (
    <Container>
      <Box
        component='form'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <FormControl sx={{ maxWidth: '100%' }}>
          <TextField
            label='New todo'
            required
            fullWidth
            name='newTodo'
            value={newTodo.todo}
            onChange={handleInputChange}
          />
          <Stack direction='row' sx={{ mx: 'auto' }} spacing={1}>
            <Button variant='contained' onClick={handleSubmit}>Submit</Button>
            <Button variant='outlined' color='error' >Clear</Button>
          </Stack>
        </FormControl>
      </Box>
      <Box>
        <TodoListTable
          editTodo={editTodo}
          tableItems={todoList}
          editable={true}
          handleDeleteBtn={handleDeleteBtn}
          onCheck={handleCheckTodo}
        />
      </Box>
    </Container>
  );
}
