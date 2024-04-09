import React, { useEffect, useState } from 'react'
import './TodoList.css'
import SignOut from './SignOut'
import { db } from '../firebase'
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { title } from 'process';
import InputTodo from './InputTodo';
import InComplete from './InComplete';
import { DialogTitle, Select } from '@mui/material';

export const TodoList = () => {
  type Todo = {
    title: string,
    id: string,
    status: "完了" | "未完了" | "着手中",
    detail: string
  }

  const [todos, setTodos] = useState<Todo[]>([])
  const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([])
  const [todoText, setTodoText] = useState<string>("")
  const [completeTodos, setCompleteTodos] = useState<Todo[]>([])


  useEffect(() => {
    const todoData = collection(db, 'todoList-row');
    getDocs(todoData).then((querySnapshot) => {
      setTodos(querySnapshot.docs.map((doc) => doc.data() as Todo));
    });
    console.log("todos", todos)
    const incompleteData = todos.filter(todo => todo.status === "未完了")
    setIncompleteTodos(incompleteData)
  }, [])


  // React.ChangeEvent=フォームの値が変更された時に発生するイベントに関連するオブジェクト
  // <HTMLInputElement>=input要素に関するプロパティやメソッドを提供するHTML DOM API
  const onChangeTodoText = (e : React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value)
  const onClickAdd = async () => {
    // if (todoText === []) return
    // const newTodos :Todo[]= [...incompleteTodos, {
    //   title: todoText,
    //   id: crypto.randomUUID() ,
    //   status: "未完了",
    //   detail: ""
    // }];

    const newTodo = {
      title: todoText,
      id: crypto.randomUUID(),
      status: "未完了",
      detail: ""
    }

    await setDoc(doc(db, "todoList-row", newTodo.id), newTodo);

    // setIncompleteTodos(newTodos)
    setTodoText('')
  }


  return (
    <>
      <h1>TODOリスト</h1>
      <div className='input-area'>
        <InputTodo
          todoText={todoText}
          onChangeTodoText={onChangeTodoText}
          onClickAdd={onClickAdd}
        />
      </div>
      <div className="list-body">
      {todos.map(({title,id,status,detail}) => (
        <div key={id}>
          <div className="row-wrap">
            <DialogTitle className='list-title'>{title}<span>{id}</span></DialogTitle>
            <select>
              <option>{status}</option>
            </select>
          </div>
          <p>メモ：{detail}</p>
        </div>
      ))}
      </div>
      <div className="area-wrap">
        <div className="incomplete-area">
          {/* <InComplete /> */}
        </div>
        <div className="complete-area">
          <p className="title">完了したTODO</p>
          <ul>
            <li>
              <div className="list-row">
                <p>銀行行く</p>
                <button>戻す</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <SignOut />
    </>
  )
}
