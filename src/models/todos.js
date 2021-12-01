import { types, getRoot, destroy, detach } from "mobx-state-tree"
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../constants/TodoFilters"
import { v4 as uuidv4 } from 'uuid'

const filterType = types.union(...[SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE].map(types.literal))
const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: (todo) => !todo.completed,
    [SHOW_COMPLETED]: (todo) => todo.completed
}

export const Todo = types
    .model({
        text: types.string,
        completed: false,
        id: types.identifier
    })
    .actions((self) => ({
        remove() {
            getRoot(self).removeTodo(self)
        },
        edit(text) {
            if (!text.length) self.remove()
            else self.text = text
        },
        toggle() {
            self.completed = !self.completed
        }
    }))

export const TodoStore = types
    .model({
        todos: types.array(Todo),
        filter: types.optional(filterType, SHOW_ALL)
    })
    .views((self) => ({
        get completedCount() {
            return self.todos.filter((todo) => todo.completed).length
        },
        get activeCount() {
            return self.todos.length - self.completedCount
        },
        get filteredTodos() {
            return self.todos.filter(TODO_FILTERS[self.filter])
        }
    }))
    .actions((self) => ({
        addTodo(text) {
            const id = uuidv4()
            self.todos.unshift({ id, text })
        },
        removeTodo(todo) {
            destroy(todo)
        },
        completeAll() {
            const areAllMarked = self.todos.every((todo) => todo.completed)
            self.todos.forEach((todo) => (todo.completed = !areAllMarked))
        },
        clearCompleted() {
            self.todos.replace(self.todos.filter((todo) => !todo.completed))
        },
        setFilter(filter) {
            self.filter = filter
        },
        reorder(from, to) {
            const todo = detach(self.todos[from])
            self.todos.splice(to, 0, todo)
        }
    }))

export default TodoStore
