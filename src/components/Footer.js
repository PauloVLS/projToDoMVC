import React from "react"
import classnames from "classnames"
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../constants/TodoFilters"
import { observer } from "mobx-react-lite"
import { Button, Row, Col, Typography, Divider } from 'antd';

const { Paragraph } = Typography;


const FILTER_TITLES = {
    [SHOW_ALL]: "All",
    [SHOW_ACTIVE]: "Active",
    [SHOW_COMPLETED]: "Completed"
}

function Footer({ store }) {
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

    function renderFilterLink(filter) {
        const title = FILTER_TITLES[filter]
        const selectedFilter = store.filter

        return (
            // eslint-disable-next-line            
            <Button
                className={classnames("ant-btn-sm " + { selected: filter === selectedFilter })} 
                style={{ cursor: "pointer" }}
                onClick={() => {store.setFilter(filter), location.reload()}}
            >
                {title}
            </Button>
        )
    }

    function renderClearButton() {
        const { completedCount, clearCompleted } = store
        if (completedCount > 0) {
            return (
                <Button className="clear-completed ant-btn-sm" onClick={() => {clearCompleted(), location.reload()}}>
                    Clear completed
                </Button>
            )
        }
    }

    return (
        <footer className="footer">
            <Divider className="dvdFooter" orientation="left"></Divider>
            <Row justify="space-around">
        
                <Col className="col1" span={8}>{renderTodoCount()}</Col>
                <Col className="col2" span={8}><ul className="filters">
                    {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map((filter) => (
                        <li key={filter}>{renderFilterLink(filter)}</li>
                    ))}
                </ul></Col>
                <Col className="col3" span={8}>{renderClearButton()}</Col>
            </Row>
        </footer>
    )
}

export default observer(Footer)