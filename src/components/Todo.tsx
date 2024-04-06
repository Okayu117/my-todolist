import React, { useEffect, useState } from 'react'
import './Todo.css'
import SignOut from './SignOut'
import { db } from '../firebase'
import { collection, getDocs } from "firebase/firestore";
import { title } from 'process';
import InputTodo from './InputTodo';
import InComplete from './InComplete';

const Todo = () => {
  type Todo = {
    title: string,
    id: number,
    status: string,
    detail: string
  }

  const [todos, setTodos] = useState<Todo[]>([])

  const todoData = collection(db, 'todoList-row');
  getDocs(todoData).then((querySnapshot) => {
    setTodos(querySnapshot.docs.map((doc) => doc.data() as Todo));
  });


  return (
    <>
      <h1>TODOリスト</h1>
      <InputTodo />
      {/* {todos.map((todo) => {
        <InputTodo
          title={todo.title}
          id={todo.id}
          status={todo.status}
          detail={todo.detail}
        />
      })} */}
      <div className="area-wrap">
        <div className="incomplete-area">
          <InComplete />
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

export default Todo
