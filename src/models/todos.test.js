import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree";
import { Todo, TodoStore } from "./Todos";

it("can create  an instace of a model", () => {
    const item = Todo.create({
        text: "teste",
        completed: false,
        id: 1
    })

    expect(item.text).toBe("teste")
    expect(item.completed).toBe(false)
    item.edit("teste2")
    expect(item.text).toBe("teste2")
    item.toggle()
    expect(item.completed).toBe(true)
})

it("can create a todo list", () => {
    const list = TodoStore.create({
        todos: [
            {
                text: "teste",
                completed: false,
                id: 1
            }
        ]
    })

    expect(list.todos.length).toBe(1)
    expect(list.todos[0].completed).toBe(false)
})

it("can add new items - 2", () => {
    const list = TodoStore.create()
    const patches = []
    onPatch(list, patch => {
        patches.push(patch)
    })

    list.addTodo("teste2")

    list.todos[0].edit("teste3")

    expect(patches).toMatchSnapshot()
})

it("can add new items", () => {
    const list = TodoStore.create()
    const states = []
    onSnapshot(list, snapshot => {
        states.push(snapshot)
    })

    list.addTodo("teste2")

    expect(list.todos.length).toBe(1)
    expect(list.todos[0].text).toBe("teste2")
    list.todos[0].edit("teste3")
    expect(list.todos[0].text).toBe("teste3")

    expect(getSnapshot(list)).toMatchSnapshot()

    expect(states).toMatchSnapshot()
})

it("can remove items", () => {
    const list = TodoStore.create({
        todos: [
            {
                text: "learn Mobx",
                completed: false,
                id: 0
            },
            {
                text: "learn MST",
                completed: true,
                id: 1
            }
        ]
    })

    expect(list.filteredTodos[0].text).toBe("learn Mobx")
    list.todos[0].remove()
    expect(list.filteredTodos[0].text).toBe("learn MST")
})

it("can view and filter Todos", () => {
    const list = TodoStore.create({
        todos: [
            {
                text: "learn Mobx",
                completed: false,
                id: 0
            },
            {
                text: "learn MST",
                completed: true,
                id: 1
            }
        ]
    })

    expect(list.activeCount).toBe(1)
    expect(list.completedCount).toBe(1)
    expect(list.filteredTodos[0].text).toBe("learn Mobx")
    list.setFilter("show_completed")
    expect(list.filteredTodos[0].text).toBe("learn MST")
})