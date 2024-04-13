import React, { useEffect, useState } from 'react'
import './TodoList.css'
import SignOut from './SignOut'
import { db } from '../firebase'
import { collection, deleteDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { title } from 'process';
import InputTodo from './InputTodo';
import InComplete from './InComplete';
import { Box, Button, DialogTitle, FormControl, Grid, InputLabel, MenuItem, NativeSelect, Select, Stack, Typography } from '@mui/material';
import SelectInput from '@mui/material/Select/SelectInput';
import { doc, setDoc } from "firebase/firestore";

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
  // const [completeTodos, setCompleteTodos] = useState<Todo[]>([])

  useEffect(() => {
    const todoData = collection(db, 'todoList-row');
    const q = query(todoData, orderBy('serverTimestamp','desc'));
    onSnapshot(q,(querySnapshot) => {
      setTodos(querySnapshot.docs.map((doc) => doc.data() as Todo))
    });

  }, [])


  // React.ChangeEvent=フォームの値が変更された時に発生するイベントに関連するオブジェクト
  // <HTMLInputElement>=input要素に関するプロパティやメソッドを提供するHTML DOM API
  const onChangeTodoText = (e : React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value)
  const onChangeDetailText = (e : React.ChangeEvent<HTMLInputElement>) => setDetailText(e.target.value)

  const onClickAdd = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    const newTodo = {
      title: todoText,
      id: crypto.randomUUID() ,
      status: "incomplete",
      detail: detailText,
      serverTimestamp: serverTimestamp()
    }
    setDoc(doc(db, "todoList-row", newTodo.id), newTodo);
    if (todoText === "") return
    const newTodos :Todo[]= [...incompleteTodos, newTodo];
    setIncompleteTodos(newTodos)
    setTodoText('')
    setDetailText('')
  }

  const todoDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>,id:Todo["id"]) => {
    e.preventDefault()
    deleteDoc(doc(db, "todoList-row", id))
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
      {todos.map((todo) => (
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
            <Button>編集</Button>
            <Button onClick={(e)=>todoDelete(e,todo.id)}>削除</Button>
        </div>
      ))}
      </Grid>




      <SignOut />
    </>
  )
}

export default TodoList
