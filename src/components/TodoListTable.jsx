import * as React from 'react';
import { useState } from 'react';
import DeleteBtn from './DeleteBtn'
import { Button, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Input, Checkbox } from '@mui/material';

export default function TodoListTable({ tableItems, editTodo, editable, handleDeleteBtn, onCheck }) {
  const [editingRow, setEditingRow] = useState(null);
  const [todo, setTodo] = useState('');
  const [error, setError] = useState(false);

  const handleTodoChange = event => setTodo(event.target.value);


  const tableData = [
    { key: 'checkbox', headerName: '' },
    { key: 'todo', headerName: 'To do' },
  ];

  const handleEditBtnClick = (row) => {
    setEditingRow(row);
    setTodo(row.todo);
  };

  const isEditingRow = (row) => {
    return editingRow !== null && editingRow.id === row.id;
  };

  const handleSaveBtnClick = (row) => {
    if (todo === '') {
      setError(true);
      return;
    } else {
      const editedTodo = {
        todo,
        id: row.id
      }
      editTodo(editedTodo);
      setEditingRow(null);
    }
  };

  const handleCheckTodo = (id) => {
    onCheck(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {tableData.map((data, index) =>
              <TableCell key={data.key} align={index === 0 ? 'left' : 'right'}>{data.headerName}</TableCell>
            )}
            {editable ? <TableCell align='right'>Action</TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableItems.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align='left'>
                <Checkbox onChange={() => handleCheckTodo(row.id)} />
              </TableCell>
              <TableCell align='right'>
                {isEditingRow(row) ? <Input error={error} defaultValue={row.todo} sx={{ width: 130 }} onChange={handleTodoChange} /> : row.todo}
              </TableCell>
              {editable ?
                <TableCell align='right'>
                  {isEditingRow(row) ?
                    <Button variant="contained" onClick={() => handleSaveBtnClick(row)} sx={{ width: 20 }}>Save</Button> :
                    <Button variant="outlined" onClick={() => handleEditBtnClick(row)} sx={{ width: 20 }}>Edit</Button>
                  }
                  <DeleteBtn handleDeleteBtn={() => handleDeleteBtn(row)} />
                </TableCell> : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
