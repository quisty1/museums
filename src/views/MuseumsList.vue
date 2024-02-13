<template>
  <div class="table__container">
    <table class="table">
      <thead>
        <tr class="thead">
          <th @click="sort('id')">ID</th>
          <th @click="sort('name')">Наименование</th>
          <th @click="sort('is_active')">Активен</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr class="tbody" v-if="museums.length > 0" v-for="museum in museums" :key="museum" :museums="fetchMuseums">
          <td>{{ museum.id }}</td>
          <td>{{ museum.name }}</td>
          <td v-if="museum.is_active"><span class="active">Да</span></td>
          <td v-else><span class="inactive">Нет</span></td>
          <td>
            <button class="delete-btn" @click="deleteMuseum(museum)"><img src="../assets/trash.webp" alt=""></button>
          </td>
        </tr>
        <h2 v-else style="color:red;">Список музеев пуст</h2>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage == 1">Назад</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage == totalPages">Вперед</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      museums: [],
      currentPage: 1,
      totalPages: 10,
      perPage: 30,
      sortBy: 'name',
      sortDesc: false
    }
  },
  methods: {
    sort(field) {
      this.sortBy = field
      this.sortDesc = !this.sortDesc
      this.fetchMuseums()
    },
    prevPage() {
      this.currentPage--
      this.fetchMuseums()
    },
    nextPage() {
      this.currentPage++
      this.fetchMuseums()
    },
    async fetchMuseums() {
      this.loading = true;
      axios
        .get(`https://developer3.elros.info/api/v1/museums/?ordering=${this.sortDesc ? '-' : ''}${this.sortBy}`)
        .then((response) => {
          this.museums = response.data.results;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    deleteMuseum(museum) {
      axios.delete(`https://developer3.elros.info/api/v1/museums/${museum.id}/`)
        .then(response => {
          this.fetchMuseums()
        })
        .catch(error => {
          console.error(error)
        })
    },
  },
  mounted() {
    this.fetchMuseums()
  }
}
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
</style>