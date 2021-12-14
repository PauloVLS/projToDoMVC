import React from "react"
import classnames from "classnames"
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../constants/TodoFilters"
import { observer } from "mobx-react-lite"
import { Button, Row, Col, Typography, Divider, Radio } from 'antd';

const { Paragraph, Link, Text } = Typography;


const FILTER_TITLES = {
    [SHOW_ALL]: "All",
    [SHOW_ACTIVE]: "Active",
    [SHOW_COMPLETED]: "Completed"
}

function handleRadioGroupChange (ev) {
    const filter = ev.target.value
    setFilter(filter)
  }

function CardActions({ store }) {
    function renderTodoCount() {
        const { activeCount } = store
        const itemWord = activeCount === 1 ? "item" : "items"

        return (
            <Typography>
                <Paragraph>
                    <span className="todo-count">
                        {activeCount || "No"} {itemWord} left
                    </span>
                </Paragraph>
            </Typography>
        )
    }

    function renderClearButton() {
        const { completedCount, clearCompleted } = store
        if (completedCount > 0) {
            return (
                <Button className="clear-completed ant-btn-sm" onClick={() => { clearCompleted() }}>
                    Clear Completed
                </Button>
            )
        }
    }

    function handleRadioGroupChange (ev) {
        const filter = ev.target.value
        store.setFilter(filter)
      }

    return (
        <div className="card_actions">
            <Divider className="dvd_card_actions" orientation="left"></Divider>
            <Row justify="space-around">

                <Col className="col1" span={8}>{renderTodoCount()}</Col>
                <Col className="col2" span={8}>
                    <Radio.Group defaultValue="show_all" buttonStyle="solid" size="small" className="filters" onChange={handleRadioGroupChange}>
                        <Radio.Button value="show_all">All</Radio.Button>
                        <Radio.Button value="show_active">Active</Radio.Button>
                        <Radio.Button value="show_completed">Completed</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col className="col3" span={8}>{renderClearButton()}</Col>
            </Row>
        </div>
    )
}
export default observer(CardActions)