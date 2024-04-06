import { Button, Input } from '@mui/material'
import React, { useState } from 'react'

const InputTodo = () => {
  const [todoText, setTodoText] = useState<string>('')
  const [incompleteTodos, setIncompleteTodos] = useState([])
  const [completeTodos, setCompleteTodos] = useState([])

  // React.ChangeEvent=フォームの値が変更された時に発生するイベントに関連するオブジェクト
  // <HTMLInputElement>=input要素に関するプロパティやメソッドを提供するHTML DOM API
  const onChangeTodoText = (e : React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value)
  const onClickAdd = () => {
    if (todoText === '') return
    const newTodos :string[]= [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos)
    setTodoText('')
  }


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
