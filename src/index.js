import React from "react"
import { render } from "react-dom"
import { getSnapshot, destroy, onSnapshot } from "mobx-state-tree"

import App from "./components/App"
import TodoStore from "./models/todos"

const localStorageKey = "mst-todomvc-example"

const initialState = localStorage.getItem(localStorageKey)
    ? JSON.parse(localStorage.getItem(localStorageKey))
    : {
          /*todos: [
              {
                  text: "learn Mobx",
                  completed: false,
                  id: uuidv4()
              },
              {
                  text: "learn MST",
                  completed: false,
                  id: uuidv4()
              }
          ]*/
      }

let store
let snapshotListenerDestroyer

function createTodoStore(snapshot) {
    // clean up snapshot listener
    if (snapshotListenerDestroyer) snapshotListenerDestroyer()
    // kill old store to prevent accidental use and run clean up hooks
    if (store) destroy(store)

    // create new one
    window.store = store = TodoStore.create(snapshot)

    // connect devtools
    // connectReduxDevtools(require("remotedev"), store)
    // connect local storage
    snapshotListenerDestroyer = onSnapshot(store, (snapshot) =>
        localStorage.setItem(localStorageKey, JSON.stringify(snapshot))
    )

    return store
}

function renderApp(App, store) {
    render(<App store={store} />, document.getElementById("root"))
}

// Initial render
renderApp(App, createTodoStore(initialState))

// Connect HMR
if (module.hot) {
    module.hot.accept(["./models/todos"], () => {
        // Store definition changed, recreate a new one from old state
        renderApp(App, createTodoStore(getSnapshot(store)))
    })

    module.hot.accept(["./components/App"], () => {
        // Componenent definition changed, re-render app
        renderApp(App, store)
    })
}
