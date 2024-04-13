import { Button, FormControl, Input, InputBase, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useState } from 'react'


type Props = {
  todoText: string,
  detailText: string,
  onChangeDetailText: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeTodoText: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onClickAdd: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  isEditForm: boolean
  newTodoText: string,
  newDetailText: string
}

const InputTodo = (props : Props) => {
  const {
    onChangeTodoText,
    onChangeDetailText,
    todoText,
    onClickAdd,
    detailText,
    isEditForm,
    newTodoText,
    newDetailText,
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
            onChange={onChangeTodoText}
            value={newTodoText}
          />
          <InputBase
            placeholder="詳細を入力"
            onChange={onChangeDetailText}
            value={newDetailText}
          />
          <Button variant="contained" onClick={onClickAdd}>更新</Button>
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

export default InputTodo
