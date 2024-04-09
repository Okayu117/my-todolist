import React, { useEffect, useState } from 'react'
import './TodoList.css'
import SignOut from './SignOut'
import { db } from '../firebase'
import { collection, getDocs } from "firebase/firestore";
import { title } from 'process';
import InputTodo from './InputTodo';
import InComplete from './InComplete';
import { Box, DialogTitle, FormControl, Grid, InputLabel, MenuItem, NativeSelect, Select, Stack, Typography } from '@mui/material';
import SelectInput from '@mui/material/Select/SelectInput';

const TodoList = () => {
  type Todo = {
    title: string,
    id: string,
    status: string,
    detail: string
  }

  const [todos, setTodos] = useState<Todo[]>([])
  const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([])
  const [todoText, setTodoText] = useState<string>("")
  const [detailText, setDetailText] = useState<string>("")
  const [completeTodos, setCompleteTodos] = useState<Todo[]>([])


  useEffect(() => {
    const todoData = collection(db, 'todoList-row');
    getDocs(todoData).then((querySnapshot) => {
      setTodos(querySnapshot.docs.map((doc) => doc.data() as Todo));
    });
  }, [])


  // React.ChangeEvent=フォームの値が変更された時に発生するイベントに関連するオブジェクト
  // <HTMLInputElement>=input要素に関するプロパティやメソッドを提供するHTML DOM API
  const onChangeTodoText = (e : React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value)
  const onChangeDetailText = (e : React.ChangeEvent<HTMLInputElement>) => setDetailText(e.target.value)

  const onClickAdd = () => {
    if (todoText === "") return
    const newTodos :Todo[]= [...incompleteTodos, {
      title: todoText,
      id: crypto.randomUUID() ,
      status: "incomplete",
      detail: detailText
    }];
    setIncompleteTodos(newTodos)
    setTodoText('')
    setDetailText('')
  }




  return (
    <>
      <Typography variant="h5">TODOリスト</Typography>
        <InputTodo
          todoText={todoText}
          detailText={detailText}
          onChangeTodoText={onChangeTodoText}
          onChangeDetailText={onChangeDetailText}
          onClickAdd={onClickAdd}
        />
        <Grid container alignItems='center' justifyContent='center' direction="column">
      {todos.map(({title,id,status,detail}) => (
        <div key={id}>
            <DialogTitle className='list-title'>{title}<span>{id}</span></DialogTitle>
            <Typography>メモ：{detail}</Typography>
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
        </div>
      ))}
      </Grid>




      <SignOut />
    </>
  )
}

export default TodoList
