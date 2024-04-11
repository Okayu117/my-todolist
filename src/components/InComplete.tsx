import React from 'react'
import TodoList from './TodoList'

type Todo = {
  title: string,
  id: number,
  status: string,
  detail: string
}

const InComplete = (props : Todo) => {
  const {title,id,status,detail} = props

  return (
    <div>
      <p className="title">未完了のTODO</p>
      <ul>
        <li>
          <div className="list-row">
            <p>バナナ買う</p>
            <button>完了</button>
            <button>削除</button>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default InComplete
