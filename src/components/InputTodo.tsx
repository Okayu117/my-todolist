import { Button, Input } from '@mui/material'
import React, { useState } from 'react'


type Todo = {
  title: string,
  id: number,
  status: string,
  detail: string
}

type Props = {
  todoText: string,
  onChangeTodoText: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onClickAdd: () => void
}

const InputTodo = (props : Props) => {
  const { onChangeTodoText, todoText, onClickAdd } = props

  return (
    <div className="input-area">
      <Input
        placeholder="TODOを入力"
        onChange={onChangeTodoText}
        value={todoText}
      />
      <Button onClick={onClickAdd}>追加</Button>
    </div>
  )
}

export default InputTodo
