<template>
  <div>
    <h1>To Do List</h1>
    <div class="search">
      <input
        v-model="query"
        type="text"
        class="searchTerm"
        placeholder="Search for a todo?"
      />
      <button @click="searchTodo()" type="submit" class="searchButton">
        search
      </button>
    </div>
    <form @submit.prevent="addTodo()">
      <label>Title</label>
      <input @keyup.enter="addTodo" v-model="newTitle" name="newTodo" autocomplete="off" type="text" />
      <br />
      <label>Description</label>
      <input
      @keyup.enter="addTodo"
        v-model="newDescription"
        name="newTodo"
        autocomplete="off"
        type="text"
      />
      <button>Add To do</button>
    </form>
    <h2>To Do Items</h2>
    <ul>
      <li v-for="(todo, index) in filteredTodos" :key="index">
        <span v-if="index == toEdit">
          <input @keyup.enter="finishEdit" v-model="todo.title" />
          <br />
          <input @keyup.enter="finishEdit" v-model="todo.Description" />
        </span>
        <span v-else>
          {{ todo.title }} <br />
          {{ todo.Description }}
        </span>
        <span v-if="index !== toEdit">
          <button @click="removeTodo(index)" class="remove--task">
            Remove
          </button>
          <button @click="editTodo(index)" class="edit--task">Edit</button>
          <button @click="detailTodo(index)" class="detail--task">
              <router-link :to="{
                   name: 'detail' , params:{
                       id: index, editTime:todo.editTime},
                   }">Detail</router-link>
              </button>
        </span>
        <span v-else>
          <button @click="finishEdit(index)">Save</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  data() {
    return {
      toEdit: -1,
     
    };
  },

  methods: {
    editTodo(index) {
      this.toEdit = index;
    },
    finishEdit(index) {
      this.toEdit = -1;
      this.filteredTodos[index].editTime = new Date().toLocaleString();
    },
    detailTodo(index){
        this.$store.commit('setCurrentTodo' , this.filteredTodos[index])
        this.router.push({name: 'detail' , params: index})
    }
  },
  name: "Home",
  setup() {
    const store = useStore();
    const query = ref("");
    const newTitle = ref(" ");
    const newDescription = ref(" ");
    const filteredTodos = ref(store.state.todos);
    const vuexTodos = computed(() => store.state.todos);

    const addTodo = () => {
      if (newTitle.value && newDescription.value) {
        store.commit("setTodos", {
          title: newTitle.value,
          Description: newDescription.value,
           editTime: -1
        });
        (newTitle.value = ""), (newDescription.value = "");
      }
    };

    const removeTodo = (index) => {
      filteredTodos.value.splice(index, 1);
    };
    const searchTodo = () => {
      console.log("query", query.value);
      filteredTodos.value = vuexTodos.value.filter((todo) => {
        return (
          todo.title.toLowerCase().includes(query.value) ||
          todo.Description.toLowerCase().includes(query.value)
        );
      });
    };

    return {
      newTitle,
      newDescription,
      addTodo,
      removeTodo,
      query,
      searchTodo,
      filteredTodos,
      vuexTodos,
      store,
    };
  },
};
</script>
<style lang="scss">
$border: 2px solid
  rgba(
    $color: white,
    $alpha: 0.35,
  );
$size1: 6px;
$size2: 12px;
$size3: 18px;
$size4: 24px;
$size5: 48px;
$backgroundColor: #27292d;
$textColor: white;
$primaryColor: #a0a4d9;
$secondTextColor: #1f2023;

body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $backgroundColor;
  color: $textColor;
  #app {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;

    h1 {
      font-weight: bold;
      font-size: 28px;
      text-align: center;
    }
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      label {
        font-size: 14px;
        font-weight: bold;
      }
      input,
      button {
        height: $size5;
        box-shadow: none;
        outline: none;
        padding-left: $size2;
        padding-right: $size2;
        border-radius: $size1;
        font-size: 18px;
        margin-top: $size1;
        margin-bottom: $size2;
      }
      input {
        background-color: transparent;
        border: $border;
        color: inherit;
      }
    }
    button {
      cursor: pointer;
      background-color: $primaryColor;
      border: 1px solid $primaryColor;
      color: $secondTextColor;
      font-weight: bold;
      outline: none;
      border-radius: $size1;
    }
    h2 {
      font-size: 22px;
      border-bottom: $border;
      padding-bottom: $size1;
    }
    button {
      cursor: pointer;
      background-color: $primaryColor;
      border: 1px solid $primaryColor;
      color: $secondTextColor;
      font-weight: bold;
      outline: none;
      border-radius: $size1;
    }
    h2 {
      font-size: 22px;
      border-bottom: $border;
      padding-top: $size1;
    }
    ul {
      padding: 10px;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: $border;
        padding: $size2 $size4;
        border-radius: $size1;
        margin-bottom: $size2;
        span {
          cursor: pointer;
        }
        .done {
          text-decoration: line-through;
        }
        button {
          font-size: $size2;
          padding: $size1;
        }
      }
    }
    h4 {
      text-align: center;
      opacity: 0.5;
      margin: 0;
    }
    .remove--task {
      position: absolute;
      margin-left: -9%;
    }
    .edit--task {
      position: absolute;
      left: 63%;
    }
    .detail--task {
      left: -134%;
      position: relative;
    }
    .search {
      width: 100%;
      position: relative;
      display: flex;
      margin-bottom: 5%;
    }

    .searchTerm {
      width: 100%;
      border: 3px solid #00b4cc;
      border-right: none;
      padding: 5px;
      height: 20px;
      border-radius: 5px 0 0 5px;
      outline: none;
      color: #9dbfaf;
    }

    .searchTerm:focus {
      color: #000;
    }

    .searchButton {
      width: 90px;
      height: 36px;
      border: 1px solid #00b4cc;
      background: #00b4cc;
      text-align: center;
      color: #fff;
      border-radius: 0 5px 5px 0;
      cursor: pointer;
      font-size: 20px;
    }
  }
}
</style>
