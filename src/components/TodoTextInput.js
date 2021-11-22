import React, { useState } from "react"
import classnames from "classnames"
import { Input, Button } from 'antd'
import {
    ScheduleTwoTone
  } from '@ant-design/icons'

function TodoTextInput({ text, onSave, newTodo, editing, placeholder }) {
    const [editingText, setEditingText] = useState(text)

    const handleSubmit = (e) => {
        const text = e.target.value.trim()
        if (e.key === "Enter") {
            onSave(text)
            if (newTodo) {
                setEditingText("")
            }
        }
    }

    const handleChange = (e) => {
        setEditingText(e.target.value)
    }

    const handleBlur = (e) => {
        if (!newTodo) {
            onSave(e.target.value)
        }
    }

    function renderToggleAll (ev) {
        const areAllFieldsDone = store.itemsLeft === 0
        store.completeAll(!areAllFieldsDone)// areAllFieldsDone? false : true
      }

    return (
        <Input
            className={classnames({
                edit: editing,
                "new-todo": newTodo
            })}
            type="text"
            placeholder={placeholder}
            autoFocus={true}
            value={editingText}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleSubmit}
            prefix={
          <Button type='link' style={{ transform: 'translateX(-4px)' }} onClick={renderToggleAll}><ScheduleTwoTone />
          </Button>
        }
        />
    )
}

export default TodoTextInput
