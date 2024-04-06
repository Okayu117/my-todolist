import React from 'react'

const InComplete = () => {
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
