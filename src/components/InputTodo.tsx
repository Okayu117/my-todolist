import { Button, FormControl, Input, InputBase, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useState } from 'react'


type Todo = {
  title: string,
  id: number,
  status: string,
  detail: string
}

type Props = {
  todoText: string,
  detailText: string,
  onChangeDetailText: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeTodoText: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onClickAdd: () => void
}

const InputTodo = (props : Props) => {
  const { onChangeTodoText, onChangeDetailText, todoText, onClickAdd, detailText } = props

  return (
    <div className="input-area" >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
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
        <Button variant="contained" onClick={onClickAdd}>追加</Button>
      </Stack>
    </div>
  )
}

export default InputTodo
