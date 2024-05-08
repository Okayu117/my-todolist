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
  const [editingId, setEditingId] = useState<string>("")
  const [editTodo, setEditTodo] = useState<Todo>({
    title: "",
    id: "",
    status: "",
    detail: "",
  })
  const { todoList } = useNewTodo()
  const onChangeEditTodo = (e : React.ChangeEvent<HTMLInputElement>) => setEditTodo({
    title: e.target.value,
    id: editTodo.id,
    status: editTodo.status,
    detail: editTodo.detail
  })
  const onChangeEditDetail = (e : React.ChangeEvent<HTMLInputElement>) => setEditTodo({
    title: editTodo.title,
    id: editTodo.id,
    status: editTodo.status,
    detail: e.target.value
  })
  const todoDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>,id:Todo["id"]) => {
    e.preventDefault()
    deleteDoc(doc(db, "todoList-row", id))
    setEditTodo({
      title: "",
      id: "",
      status: "",
      detail: "",
    })
    setIsEditForm(false)
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
    }
  const onClickEdit = async (e: React.MouseEvent<HTMLElement, MouseEvent>,id:string) => {
    e.preventDefault()
    const editTodoDoc = doc(db, "todoList-row", id);
    const newTodo = {
      title: editTodo.title,
      id: editTodo.id,
      status: editTodo.status,
      detail: editTodo.detail,
      serverTimestamp: serverTimestamp()
    }
    await updateDoc(editTodoDoc, newTodo);
    setEditTodo({
      title: "",
      id: "",
      status: "",
      detail: "",
    })
    setIsEditForm(false)
  }
  return {isEditForm, editTodo, editingId, onChangeEditTodo, onChangeEditDetail, onClickEdit, todoDelete, editFormOpen}
}

