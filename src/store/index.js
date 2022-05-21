import { createStore } from "vuex";

const store = createStore({
  state: {
    todo: {},
    todos: [
      {
        title: "Immigration",
        Description: "Study in Canada",
        editTime: -1,
      },
    ],
  },
  mutations: {
    setCurrentTodo(state, todo) {
      state.todo = todo;
    },
    setTodos(state, todo) {
      state.todos.push(todo);
    },
  },
  actions: {},
  modules: {},
});
export default store;
