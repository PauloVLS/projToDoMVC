import React, { useState } from "react"
import classnames from "classnames"
import TodoTextInput from "./TodoTextInput"
import { observer } from "mobx-react-lite"
import { Button, Checkbox } from 'antd'
import {
    DeleteOutlined
} from '@ant-design/icons'

function TodoItem({ todo }) {
    const [editing, setEditing] = useState(false)

    const handleDoubleClick = () => {
        setEditing(true)
    }

    const handleSave = (id, text) => {
        todo.edit(text)
        setEditing(false)
    }

    return (
        <li
            className={classnames({
                completed: todo.completed,
                editing
            })}
        >
            {editing ? (
                <TodoTextInput
                    text={todo.text}
                    placeholder={todo.text}
                    editing={editing}
                    onSave={(text) => handleSave(todo.id, text)}
                />
            ) : (
                <div className="view">
                    
                        <p className='toDoIntem'>
                        <Checkbox 
                        className="toggle"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => todo.toggle()}
                    />
                    <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
                    <Button className='deleteBtn' type='danger' onClick={() => { todo.remove() }}><DeleteOutlined /></Button>
                        </p>
                </div>
            )}
        </li>
    )
}
export default observer(TodoItem)
