import { Button, InputBase, Stack } from '@mui/material'

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
    <>
      <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {isEditForm ? (
        <>
          <InputBase
            placeholder="タイトルを入力"
            onChange={onChangEditTodoText}
            value={editTodoText}
          />
          <InputBase
            placeholder="詳細を入力"
            onChange={onChangeEditDetailText}
            value={editDetailText}
          />
          <Button variant="contained" onClick={(e)=>onClickEdit(e,id)} disabled={!editTodoText}>更新</Button>
        </>
      ) : (
        <>
          <InputBase
            placeholder="タイトルを入力"
            onChange={onChangeTodoText}
            value={todoText}
          />
          <InputBase
            placeholder="詳細を入力"
            onChange={onChangeDetailText}
            value={detailText}
          />
          <Button variant="contained" onClick={onClickAdd} disabled={!todoText}>追加</Button>
        </>
      )}
      </Stack>
    </>
  )
}