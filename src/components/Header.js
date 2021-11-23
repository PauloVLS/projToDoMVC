import React from "react"
import "../../src/style.css"
import {
    Image,
    Space,
    Typography
} from 'antd'

const { Title } = Typography

function Header({  }) {

    return (
        <header className="header">
            <Space style={{ padding: '3rem 0' }}>                
                <Image src='https://raw.githubusercontent.com/fabiospampinato/vscode-todo-plus/master/resources/logo/logo.png' alt='TodoMVC' width={165} height={165} />
                <Title style={{ color: 'white' }}>Looplex TodoMVC</Title>
            </Space>
        </header>
    )
}

export default Header