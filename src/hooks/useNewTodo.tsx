import { useEffect, useState } from "react";
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query, serverTimestamp, doc, setDoc } from "firebase/firestore";

export const useNewTodo = () => {
  type Todo = {
    title: string,
    id: string,
    status: string,
    detail: string,
    serverTimestamp: any
  }
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [todoText, setTodoText] = useState<string>("")
  const [detailText, setDetailText] = useState<string>("")

  useEffect(() => {
    const todoData = collection(db, 'todoList-row');
    const q = query(todoData, orderBy('serverTimestamp','desc'));
    onSnapshot(q,(querySnapshot) => {
      setTodoList(querySnapshot.docs.map((doc) => doc.data() as Todo))
    });
  }, [])

  const onChangeTodoText = (e : React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value)
  const onChangeDetailText = (e : React.ChangeEvent<HTMLInputElement>) => setDetailText(e.target.value)

  const onClickAdd = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    // const randomId : string = Math.random().toString().slice(2,7)
    const newTodo = {
      title: todoText,
      id: Math.random().toString().slice(2,7),
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

  return {todoList, todoText, detailText, onChangeTodoText, onChangeDetailText, onClickAdd}
}