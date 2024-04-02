import React from 'react'
import './Todo.css'

const Todo = () => {
  return (
    <>
      <h1>TODOリスト</h1>
      <div className="input-area">
        <input placeholder="TODOを入力" />
        <button>追加</button>
      </div>
      <div className="area-wrap">
        <div className="incomplete-area">
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
    </>
  )
}

export default Todo
