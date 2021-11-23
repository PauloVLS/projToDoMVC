import React, { useState } from "react"
import classnames from "classnames"
import TodoTextInput from "./TodoTextInput"
import { observer } from "mobx-react-lite"
import { Button, Checkbox } from 'antd'
import {
    EditOutlined,
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
                <div className="view">
                <p className='toDoItem'>
                    <Checkbox
                        className="toggle"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => todo.toggle()}
                    />
                    <TodoTextInput
                    className="edit"
                    text={todo.text}
                    placeholder={todo.text}
                    editing={editing}
                    onSave={(text) => handleSave(todo.id, text)}
                />                    
                    <Button className='deleteBtn' type='danger' onClick={() => { todo.remove() }}><DeleteOutlined /></Button>
                </p>
            </div>
                
            ) : (
                <div className="view">
                    <p className='toDoItem'>
                        <Checkbox
                            className="toggle"
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => todo.toggle()}
                        />
                        <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
                        <span role="button" className='editBtn' onClick={handleDoubleClick}><EditOutlined /></span>
                        <Button className='deleteBtn' type='danger' onClick={() => { todo.remove() }}><DeleteOutlined /></Button>
                    </p>
                </div>
            )}
        </li>
    )
}
export default observer(TodoItem)