import { Button, InputBase, Input, TextField, Stack } from '@mui/material'
import { ThemeProvider } from '@mui/material';
import { theme } from '../theme/theme';
import CssBaseline from '@mui/material/CssBaseline';


type Props = {
  todoText: string,
  detailText: string,
  onChangeDetailText: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeTodoText: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onClickAdd: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  onClickEdit: (e: React.MouseEvent<HTMLElement, MouseEvent>,id:string) => void,
  onChangEditTodoText: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeEditDetailText: (event: React.ChangeEvent<HTMLInputElement>) => void,
  isEditForm: boolean
  editTodoText: string
  editDetailText: string
  id: string
}

export const InputTodo = (props : Props) => {
  const {
    onChangeTodoText,
    onChangeDetailText,
    todoText,
    onClickAdd,
    onClickEdit,
    onChangEditTodoText,
    onChangeEditDetailText,
    detailText,
    isEditForm,
    editTodoText,
    editDetailText,
    id,
  } = props



  return (
    <ThemeProvider theme={theme}>
      <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      marginTop={3}
    >
      {isEditForm ? (
        <>
          <TextField id="outlined-basic" variant="outlined" size="small"
            placeholder="タイトルを入力"
            onChange={onChangEditTodoText}
            value={editTodoText}
            style={{ backgroundColor:'#dae9cb', borderRadius: '4px'}}
          />
          <TextField id="outlined-basic" variant="outlined" size="small"
            placeholder="詳細を入力"
            onChange={onChangeEditDetailText}
            value={editDetailText}
            style={{ backgroundColor:'#b6e0dc', borderRadius: '4px'}}
          />
          <Button variant="contained" onClick={(e)=>onClickEdit(e,id)} disabled={!editTodoText}>更新</Button>
        </>
      ) : (
        <>
          <TextField id="outlined-basic" variant="outlined" size="small"
            placeholder="タイトルを入力"
            onChange={onChangeTodoText}
            value={todoText}
            style={{ backgroundColor:'#dae9cb', borderRadius: '4px', outline: 'none'}}

          />
          <TextField id="outlined-basic" variant="outlined" size="small"
            placeholder="詳細を入力"
            onChange={onChangeDetailText}
            value={detailText}
            style={{ backgroundColor:'#b6e0dc', borderRadius: '4px', outline: 'none'}}
          />
          <Button variant="contained"
          onClick={onClickAdd}
          disabled={!todoText}
          style={{ backgroundColor:'#f9ec93', borderRadius: '4px', color: '#000'}}
          >追加</Button>
        </>
      )}
      </Stack>
    </ThemeProvider>
  )
}