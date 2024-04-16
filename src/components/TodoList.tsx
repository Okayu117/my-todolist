import React, { useEffect, useState } from 'react'
import './TodoList.css'
import SignOut from './SignOut'
import { db } from '../firebase'
import { collection, deleteDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { title } from 'process';
import InputTodo from './InputTodo';
import InComplete from './InComplete';
import { Box, Button, DialogTitle, FormControl, Grid, Input, InputLabel, MenuItem, NativeSelect, Select, Stack, Typography } from '@mui/material';
import SelectInput from '@mui/material/Select/SelectInput';
import { doc, setDoc } from "firebase/firestore";
import { on } from 'events';

const TodoList = () => {
  type Todo = {
    title: string,
    id: string,
    status: string,
    detail: string
  }

  const [todoList, setTodoList] = useState<Todo[]>([])
  const [todoText, setTodoText] = useState<string>("")
  const [detailText, setDetailText] = useState<string>("")
  const [isEditForm, setIsEditForm] = useState<boolean>(false)
  const [editTodoText, setEditTodoText] = useState<string>("")
  const [editDetailText, setEditDetailText] = useState<string>("")
  const [editingId, setEditingId] = useState<string>("")



  useEffect(() => {
    const todoData = collection(db, 'todoList-row');
    const q = query(todoData, orderBy('serverTimestamp','desc'));
    onSnapshot(q,(querySnapshot) => {
      setTodoList(querySnapshot.docs.map((doc) => doc.data() as Todo))
    });

  }, [])


  // React.ChangeEvent=フォームの値が変更された時に発生するイベントに関連するオブジェクト
  // <HTMLInputElement>=input要素に関するプロパティやメソッドを提供するHTML DOM API
  const onChangeTodoText = (e : React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value)
  const onChangeDetailText = (e : React.ChangeEvent<HTMLInputElement>) => setDetailText(e.target.value)
  const onChangeEditTodoText = (e : React.ChangeEvent<HTMLInputElement>) => setEditTodoText(e.target.value)
  const onChangeEditDetailText = (e : React.ChangeEvent<HTMLInputElement>) => setEditDetailText(e.target.value)


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
    const newTodos :Todo[]= [...todoList, newTodo];
    setTodoList(newTodos)
    setTodoText('')
    setDetailText('')
  }

  const todoDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>,id:Todo["id"]) => {
    e.preventDefault()
    deleteDoc(doc(db, "todoList-row", id))
    }

  const editFormOpen = (e: React.MouseEvent<HTMLElement, MouseEvent>,id:string) => {
    e.preventDefault()
    setIsEditForm(true)
    // const newTodos:Todo[]= todoList.filter((todo) => todo.id !== id)
    // setTodoList(newTodos)
    const editTodo:any = todoList.find((todo) => todo.id === id)
    setEditTodoText(editTodo.title)
    setEditDetailText(editTodo.detail)
    setEditingId(editTodo.id)
  }


  const onClickEdit = async (e: React.MouseEvent<HTMLElement, MouseEvent>,id:string) => {
    e.preventDefault()
    const editTodoDoc = doc(db, "todoList-row", id);
    const editTodo = {
      title: editTodoText,
      id: id,
      status: "incomplete",
      detail: editDetailText,
      serverTimestamp: serverTimestamp()
    }
    // console.log(editTodo)
    await updateDoc(editTodoDoc, editTodo);
    const newTodos = todoList.map((todo) => ({ ...todo }))
    console.log(newTodos)
    setTodoList(newTodos)
    setEditTodoText('')
    setEditDetailText('')
    setIsEditForm(false)
  }

  const onClickEditClose = () => {
    setIsEditForm(false)
    setEditTodoText('')
    setEditDetailText('')
  }




  return (
    <>
      <Typography variant="h5">TODOリスト</Typography>
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
          onClickEditClose={onClickEditClose}
        />
        {/* <Grid container alignItems='center' justifyContent='center' direction="row" gap={2}>
          <Select value="未完了" size='small' onChange={(e)=>console.log(e.target.value)}>
            <MenuItem value="未完了">未完了</MenuItem>
            <MenuItem value="作業中">作業中</MenuItem>
            <MenuItem value="完了">完了</MenuItem>
          </Select>
          <Button>絞り込み</Button>
        </Grid> */}
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

export default TodoList
