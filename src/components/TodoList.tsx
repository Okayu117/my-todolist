import { SignOut } from './SignOut'
import { InputTodo } from './InputTodo';
import { Button, DialogTitle, FormControl, Grid, NativeSelect, Typography } from '@mui/material';
import { useNewTodo } from '../hooks/useNewTodo';
import { useEditTodo } from '../hooks/useEditTodo';

export const TodoList = () => {

  const {todoList, todoText, detailText, onChangeTodoText, onChangeDetailText, onClickAdd} = useNewTodo()
  const {isEditForm, editTodoText, editDetailText, editingId, onChangeEditTodoText, onChangeEditDetailText, onClickEdit, editFormOpen, todoDelete} = useEditTodo()


  return (
    <>
      <Typography textAlign="center" variant="h5">TODOリスト</Typography>
        <InputTodo
          todoText={todoText}
          detailText={detailText}
          onChangeTodoText={onChangeTodoText}
          onChangeDetailText={onChangeDetailText}
          onChangEditTodoText={onChangeEditTodoText}
          onChangeEditDetailText={onChangeEditDetailText}
          onClickAdd={onClickAdd}
          onClickEdit={onClickEdit}
          isEditForm={isEditForm}
          editTodoText={editTodoText}
          editDetailText={editDetailText}
          id={editingId}
        />
        <Grid container alignItems='center' justifyContent='center' direction="column">
      {todoList.map((todo) => (
        <div key={todo.id}>
            <DialogTitle className='list-title'>{todo.title}</DialogTitle>
            <Typography>ID:{todo.id}</Typography>
            <Typography>詳細:{todo.detail}</Typography>
            <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
              <NativeSelect
                defaultValue={1}
                // inputProps={{
                //   name: 'status',
                //   id: 'status',
                // }}
              >
                <option value={1}>未完了</option>
                <option value={2}>作業中</option>
                <option value={3}>完了</option>
              </NativeSelect>
            </FormControl>
            <Button onClick={(e)=>editFormOpen(e,todo.id)}>編集</Button>
            <Button onClick={(e)=>todoDelete(e,todo.id)}>削除</Button>
        </div>
      ))}
      </Grid>
      <SignOut />
    </>
  )
}
