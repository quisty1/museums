<template>
  <div class="table__container">
    <table class="table">
      <thead>
        <tr class="thead">
          <th @click="sort('id')">ID
            <span v-if="sortBy === 'id' && !sortDesc">↓</span>
            <span v-else-if="sortBy === 'id' && sortDesc">↑</span>
          </th>
          <th @click="sort('name')">Наименование
            <span v-if="sortBy === 'name' && !sortDesc">↓</span>
            <span v-else-if="sortBy === 'name' && sortDesc">↑</span>
          </th>
          <th @click="sort('is_active')">Активен
            <span v-if="sortBy === 'is_active' && !sortDesc">↓</span>
            <span v-else-if="sortBy === 'is_active' && sortDesc">↑</span>
          </th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr class="tbody" v-if="museums.length > 0" v-for="museum in museums" :key="museum.id">
          <td>{{ museum.id }}</td>
          <td>{{ museum.name }}</td>
          <td v-if="museum.is_active"><span class="active">Да</span></td>
          <td v-else><span class="inactive">Нет</span></td>
          <td>
            <button class="delete-btn" @click="deleteMuseum(museum)"><img src="../assets/trash.webp" alt=""></button>
          </td>
        </tr>
        <tr v-else>
          <td colspan="4" style="color: red;">Список музеев пуст</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="pagination__container">
    <pagination :total-pages="totalPages" :current-page="currentPage" @page-changed="handlePaginate"></pagination>
    <div class="select">
      <span>Количество на странице: </span>
      <select v-model="perPage" @change="changeOption">
        <option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import pagination from "../components/Pagination";
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    pagination
  },
  computed: {
    ...mapState(['museums', 'totalPages', 'perPage', 'currentPage', 'sortBy', 'sortDesc', 'sortOptions'])
  },
  mounted() {
    this.fetchMuseums(this.currentPage);
  },
  methods: {
    ...mapActions(['fetchMuseums', 'deleteMuseum']),
    sort(field) {
      this.$store.commit('SET_SORT_BY', field);
      this.$store.commit('SET_SORT_DESC', this.sortBy === field ? !this.sortDesc : false);
      this.fetchMuseums(this.currentPage);
    },
    handlePaginate(page) {
      this.$store.commit('SET_CURRENT_PAGE', page);
      this.fetchMuseums(page);
    },
    changeOption(event) {
      this.$store.commit('SET_PER_PAGE', event.target.value);
      this.fetchMuseums(this.currentPage);
    }
  }
};
</script>

<style scoped>
.delete-btn {
  background: none;
  padding: 0;
}

img {
  width: 20px;
}

.active,
.inactive {
  display: inline-block;
  width: 40px;
  border-radius: 50%;
  padding: 9px;
}

.active {
  background-color: #DEF2E7;
}

.inactive {
  background-color: #ebb4b4;
}

table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
}

thead th:nth-child(1) {
  width: 20%;
}

thead th:nth-child(2) {
  width: 40%;
}

thead th:nth-child(3) {
  width: 20%;
}

thead th:nth-child(4) {
  width: 20%;
}

th {
  cursor: pointer;
}

th,
td {
  padding: 20px;
  border-bottom: 1px solid gray;
  text-align: left;
}

.pagination__container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
</style>