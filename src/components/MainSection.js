import React from "react"
import * as classNames from 'classnames';
import TodoItem from "./TodoItem"
import TodoTextInput from "./TodoTextInput"
import CardActions from "./CardActions"
import { observer } from "mobx-react-lite"
import { Layout, Row, Col, Card, Typography } from 'antd'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState } from "react"

const { Content, Footer } = Layout
const { Text, Link } = Typography

function MainSection() {

    function addToDoItem() {
        const handleSave = (text) => {
            if (text?.length !== 0) {
                addTodo(text)
                location.reload()
            }
        }

        return (
            <TodoTextInput newTodo onSave={handleSave} size="large" rules={[{ required: true, message: 'Digite uma tarefa' }]} placeholder="What needs to be done?" />
        )
    }

    function renderCardActions(completedCount) {
        if (store.todos.length) {
            return <CardActions store={store} />
        }
    }

    const { filteredTodos } = store

    const [todoList, updateTodos] = useState(filteredTodos)

    function handleOnDragEnd(result) {
        // console.log(result)
        if (!result.destination) return;
        const items = Array.from(todoList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateTodos(items);
        store.reorder(result.source.index, result.destination.index)
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
                                    {(provided, snapshot) => (
                                        <ul className={classNames('todo_list container', snapshot.isDraggingOver && 'draggingOver')} {...provided.droppableProps} ref={provided.innerRef}>
                                            {todoList.map((todo, index) => (
                                                <TodoItem key={todo.id} todo={todo} index={index} />
                                            ))}
                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            {renderCardActions()}
                        </Card>
                    </section>
                </Col>
            </Row>
            <Footer className="footer">
                <div style={{ textAlign: 'center' }}><Text type='secondary'>Made with ❤️ by Paulo Victor. Based on <Link target="_blank" href="https://looplex-todomvc.vercel.app/">TodoMVC Looplex</Link>.</Text></div>
            </Footer>
        </Content>
    )
}

export default observer(MainSection)