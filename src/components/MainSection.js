import React from "react"
import TodoItem from "./TodoItem"
import TodoTextInput from "./TodoTextInput"
import Footer from "./Footer"
import { observer } from "mobx-react-lite"
import { Layout, Row, Col, Card } from 'antd'

const { Content } = Layout

function MainSection({ addTodo, store }) {

    function addToDoItem() {
        const handleSave = (text) => {
            if (text?.length !== 0) {
                addTodo(text)
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

    return (
        <Content>
            <Row justify='center'>
                <Col span={12}>
                    <section className="main">
                        {addToDoItem()}
                        <Card className="card" >
                            <ul className="todo-list">
                                {filteredTodos.map((todo) => (
                                    <TodoItem key={todo.id} todo={todo} />
                                ))}
                            </ul>
                        
                        {renderFooter()}
                        </Card>
                    </section>
                </Col>
            </Row>
        </Content>
    )
}

export default observer(MainSection)
