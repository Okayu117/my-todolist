import { SignOut } from './SignOut'
import { InputTodo } from './InputTodo';
import { Button, DialogTitle, FormControl, Grid, NativeSelect, Typography } from '@mui/material';
import { useNewTodo } from '../hooks/useNewTodo';
import { useEditTodo } from '../hooks/useEditTodo';
import { Card, CardActions, CardContent, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { theme } from '../theme/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { useUnsplash } from '../hooks/useUnsplash';



export const TodoList = () => {

  const {todoList, todoText, detailText, onChangeTodoText, onChangeDetailText, onClickAdd} = useNewTodo()
  const {isEditForm, editTodo, editingId, onChangeEditTodo, onChangeEditDetail, onClickEdit, editFormOpen, todoDelete} = useEditTodo()
  const {imageUrl, setImageUrl} = useUnsplash()


  return (
    <div style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', width: '100%', height: '100vh', paddingTop:'20px',paddingBottom:'20px' }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography textAlign="center" variant="h5" marginTop={5}>TO-DO LIST</Typography>
        <InputTodo
          todoText={todoText}
          detailText={detailText}
          onChangeTodoText={onChangeTodoText}
          onChangeDetailText={onChangeDetailText}
          onChangeEditTodo={onChangeEditTodo}
          onChangeEditDetail={onChangeEditDetail}
          onClickAdd={onClickAdd}
          onClickEdit={onClickEdit}
          isEditForm={isEditForm}
          editTodo={editTodo}
          id={editingId}
        />
        <Grid container
        alignItems='center'
        justifyContent='center'
        paddingTop={5}
        maxWidth={'1000px'}
        padding={'20px'}
        marginLeft='auto'
        marginRight='auto'
        marginTop={2}
        gap={2}
        >
      {todoList.map((todo) => (
        <div key={todo.id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                ID:{todo.id}
              </Typography>
              <Typography variant="h5" component="div" textAlign='center'>
                {todo.title}
              </Typography>
              <Typography variant="body2" textAlign='center' marginTop={2}>
                {todo.detail}
                <br />
              </Typography>
            </CardContent>
            <Box display="flex" justifyContent="center" alignItems='center' padding='20px' gap={2}
            style={{ color: '#ffff' }}>
              <Button size="small"
              onClick={(e)=>editFormOpen(e,todo.id)}
              style={{ backgroundColor: '#c5e1a5', color: '#ffff' }}
              >
              編集
              </Button>
              <Button
              size="small"
              onClick={(e)=>todoDelete(e,todo.id)}
              style={{ backgroundColor: '#71c2c2', color: '#ffff' }}
              >
              削除
              </Button>
            </Box>
          </Card>
        </div>
      ))}
      </Grid>
      <SignOut />
    </ThemeProvider>
    </div>
  )
}
