import React from "react"
import TodoItem from "./TodoItem"
import TodoTextInput from "./TodoTextInput"
import Footer from "./Footer"
import { observer } from "mobx-react-lite"
import { Layout, Row, Col, Card } from 'antd'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState } from "react"

const { Content } = Layout

function MainSection({ addTodo, store }) {

    function addToDoItem() {
        const handleSave = (text) => {
            if (text?.length !== 0) {
                addTodo(text)
                location.reload()
            }
        }

        return (
            // Form.Item
            <TodoTextInput newTodo onSave={handleSave} rules={[{ required: true, message: 'Digite uma tarefa' }]} placeholder="What needs to be done?" />
        )
    }

    function renderFooter(completedCount) {
        if (store.todos.length) {
            return <Footer store={store} />
        }
    }

    const { filteredTodos } = store

    const [todoList, updateTodos] = useState(filteredTodos)

    function handleOnDragEnd(result) {
        console.log(result)
        if (!result.destination) return;
        const items = Array.from(todoList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateTodos(items);
    }
    
    

    return (
        <Content>
            <Row justify='center'>
                <Col span={12}>
                    <section className="main">
                        {addToDoItem()}
                        <Card className="card" >
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Droppable droppableId="todo_list">
                                    {(provided) => (
                                        <ul className="todo_list" {...provided.droppableProps} ref={provided.innerRef}>
                                            {todoList.map((todo, index) => (
                                                <TodoItem key={todo.id} todo={todo} index={index} />
                                            ))}
                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            {renderFooter()}
                        </Card>
                    </section>
                </Col>
            </Row>
        </Content>
    )
}

export default observer(MainSection)
