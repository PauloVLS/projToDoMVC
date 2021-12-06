import React from "react"
import Header from "../components/Header"
import { observer } from "mobx-react-lite"
import * as classNames from 'classnames';
import TodoItem from "./TodoItem"
import TodoTextInput from "./TodoTextInput"
import CardActions from "./CardActions"
import { Layout, Row, Col, Card, Typography } from 'antd'
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const { Content, Footer } = Layout
const { Text, Link } = Typography

const App = observer(({ store }) => {

    const { filteredTodos, todos, addTodo } = store

    const handleSave = (text) => {
        if (text?.length !== 0) {
            addTodo(text)
        }

    }

    function renderCardActions(completedCount) {
        if (todos) {
            return <CardActions store={store} />
        }
    }

    function handleOnDragEnd(result) {
        // console.log(result)
        if (!result.destination) return;
        const [reorderedItem] = filteredTodos.splice(result.source.index, 1);
        filteredTodos.splice(result.destination.index, 0, reorderedItem);

        store.reorder(result.source.index, result.destination.index)
    }

    return (
        <div>
            <Header />
            <Content>
                <Row justify='center'>
                    <Col span={12}>
                        <section className="main">
                            <TodoTextInput newTodo onSave={handleSave} size="large"
                                rules={[{ required: true, message: 'Digite uma tarefa' }]}
                                placeholder="What needs to be done?" />
                            {todos.length > 0 &&
                                <Card className="card" >
                                    <DragDropContext onDragEnd={handleOnDragEnd}>
                                        <Droppable droppableId="todo_list">
                                            {(provided, snapshot) => (
                                                <ul className={classNames('todo_list container', snapshot.isDraggingOver && 'draggingOver')} {...provided.droppableProps} ref={provided.innerRef}>
                                                    {filteredTodos.map((todo, index) => (
                                                        <TodoItem key={todo.id} todo={todo} index={index} />
                                                    ))}
                                                    {provided.placeholder}
                                                </ul>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                    {renderCardActions()}
                                </Card>
                            }
                        </section>
                    </Col>
                </Row>
                <Footer className="footer">
                    <div style={{ textAlign: 'center' }}><Text type='secondary'>Made with ❤️ by Paulo Victor. Based on <Link target="_blank" href="https://looplex-todomvc.vercel.app/">TodoMVC Looplex</Link>.</Text></div>
                </Footer>
            </Content>
        </div>
    )
}
)

export default App