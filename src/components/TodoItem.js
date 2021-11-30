import React, { useState } from "react"
import classnames from "classnames"
import TodoTextInput from "./TodoTextInput"
import { observer } from "mobx-react-lite"
import { Button, Checkbox } from 'antd'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons'
import { Draggable } from 'react-beautiful-dnd';

function TodoItem({ todo, index }) {
    const [editing, setEditing] = useState(false)

    const handleDoubleClick = () => {
        setEditing(true)
    }

    const handleSave = (id, text) => {
        todo.edit(text)
        setEditing(false)
    }

    const { filteredTodos } = store

    return (
        <Draggable key={todo.id} draggableId={todo.id} 
        index={index} 
        className={classnames({
            completed: todo.completed,
            editing
        })}>
            {(provided) => (
                <li
                {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}  
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
                                <Button className='deleteBtn' type='danger' onClick={() => { todo.remove(todo.id), location.reload() }}><DeleteOutlined /></Button>
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
                                <label onDoubleClick={handleDoubleClick}
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        color: todo.completed ? 'rgba(0,0,0,.45)' : 'rgba(0, 0, 0, 0.85)'
                                    }}
                                >{todo.text}</label>
                                <span role="button" className='editBtn' onClick={handleDoubleClick}><EditOutlined /></span>
                                <Button className='deleteBtn' type='danger' onClick={() => { todo.remove(todo.id), location.reload() }}><DeleteOutlined /></Button>
                            </p>
                        </div>
                    )}
                </li>
            )}
        </Draggable>
    )
}
export default observer(TodoItem)