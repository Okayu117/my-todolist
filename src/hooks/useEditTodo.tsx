import { doc, serverTimestamp, updateDoc, deleteDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../firebase'
import { useNewTodo } from './useNewTodo'

type Todo = {
  title: string,
  id: string,
  status: string,
  detail: string
}

export const useEditTodo = () => {
  const [isEditForm, setIsEditForm] = useState<boolean>(false)
  const [editTodoText, setEditTodoText] = useState<string>("")
  const [editDetailText, setEditDetailText] = useState<string>("")
  const [editingId, setEditingId] = useState<string>("")
  const [editTodo, setEditTodo] = useState<Todo>({
    title: "",
    id: "",
    status: "",
    detail: "",
  })
  const { todoList } = useNewTodo()
  const onChangeEditTodoText = (e : React.ChangeEvent<HTMLInputElement>) => setEditTodoText(e.target.value)
  const onChangeEditDetailText = (e : React.ChangeEvent<HTMLInputElement>) => setEditDetailText(e.target.value)
  const todoDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>,id:Todo["id"]) => {
    e.preventDefault()
    deleteDoc(doc(db, "todoList-row", id))
    }
    const editFormOpen = (e: React.MouseEvent<HTMLElement, MouseEvent>,id:string) => {
      e.preventDefault()
      setIsEditForm(true)
      const editTodo:any = todoList.find((todo) => todo.id === id)
      setEditTodo({
        title: editTodo.title,
        id: editTodo.id,
        status: editTodo.status,
        detail: editTodo.detail,
      })
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
    await updateDoc(editTodoDoc, editTodo);
    setEditTodoText('')
    setEditDetailText('')
    setIsEditForm(false)
  }
  return {isEditForm, editTodoText, editDetailText, editingId, onChangeEditTodoText, onChangeEditDetailText, onClickEdit, todoDelete, editFormOpen}
}

