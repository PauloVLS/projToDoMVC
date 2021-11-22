import React from "react"
import classnames from "classnames"
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../constants/TodoFilters"
import { observer } from "mobx-react-lite"
import { Button, Row, Col, Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;


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
                className={classnames({ selected: filter === selectedFilter })}
                style={{ cursor: "pointer" }}
                onClick={() => store.setFilter(filter)}
            >
                {title}
            </Button>
        )
    }

    function renderClearButton() {
        const { completedCount, clearCompleted } = store
        if (completedCount > 0) {
            return (
                <Button className="clear-completed" onClick={() => clearCompleted()}>
                    Clear completed
                </Button>
            )
        }
    }

    return (
        <footer className="footer">
            <Row>

                <Col className="col1" span={5}>{renderTodoCount()}</Col>
                <Col className="col2" span={11}><ul className="filters">
                    {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map((filter) => (
                        <li key={filter}>{renderFilterLink(filter)}</li>
                    ))}
                </ul></Col>
                <Col className="col3" span={3}>{renderClearButton()}</Col>
            </Row>
        </footer>
    )
}

export default observer(Footer)
