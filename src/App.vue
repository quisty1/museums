<template>
  <div class="container">
    <nav>
      <h3>Место проведения</h3>
      <router-link class="router-link" to="/add">+ Добавить</router-link>
    </nav>
    <RouterView></RouterView>
  </div>
</template>

<script>
// import AddMuseum from './views/AddMuseum.vue';
// import MuseumsList from './views/MuseumsList.vue';
export default {
  // components: {
  //   MuseumsList,
  //   AddMuseum
  // }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  padding: 20px;
}

nav {
  display: flex;
  justify-content: space-between;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  background-color: #DEF2E7;
  border-radius: 5px;
  padding: 10px 15px;
  border: none;
  color: #40B573;
}

.router-link {
  background: none;
  border: none;
  cursor: pointer;
  background-color: #DEF2E7;
  border-radius: 5px;
  padding: 10px 15px;
  border: none;
  color: #40B573;
  text-decoration: none;
}
</style>
