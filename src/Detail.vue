<template>
  <div class="card">
    <h1 class="header-card">{{$store.state.todo.title}}</h1>
    <p v-if="$store.state.todo.editTime != -1"  class="price" >
      last Edit: {{ $store.state.todo.editTime }}
    </p>
 <p v-else >No Eddit time</p>
    <p>{{$store.state.todo.Description}}</p>
  </div>
  <button @click="backHome" class="back--button">&#8617;</button>
</template>

<script>

export default {
  methods: {
    backHome() {
      this.$router.push("/");
    },
  },
  created() {
    console.log(this.$route);
  },

};
</script>
<style scoped>
.header-card {
  font-size: 18px;
}
.back--button {
  font-size: 20px;
  padding: 0 5px;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: left;
  padding: 15px;
  margin: 15% auto;
  border: 1px solid #fff;
  font-family: arial;
}

.price {
  color: grey;
  font-size: 22px;
}

.card button {
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

.card button:hover {
  opacity: 0.7;
}
</style>