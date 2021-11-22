import React from "react"
import Header from "../components/Header"
import MainSection from "../components/MainSection"

const App = ({ store }) => (
    <div>
        <Header  />
        <MainSection addTodo={store.addTodo} store={store} />
    </div>
)

export default App