<template>
  <div class="table__container">
    <table class="table">
      <thead>
        <tr class="thead">
          <th @click="sort('id')">ID
            <span v-if="(this.sortBy == 'id') && (this.sortDesc == false)">↓</span>
            <span v-else-if="(this.sortBy == 'id') && (this.sortDesc == true)">↑</span>
          </th>
          <th @click="sort('name')">Наименование
            <span v-if="(this.sortBy == 'name') && (this.sortDesc == false)">↓</span>
            <span v-else-if="(this.sortBy == 'name') && (this.sortDesc == true)">↑</span>
          </th>
          <th @click="sort('is_active')">Активен
            <span v-if="(this.sortBy == 'is_active') && (this.sortDesc == false)">↓</span>
            <span v-else-if="(this.sortBy == 'is_active') && (this.sortDesc == true)">↑</span>
          </th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr class="tbody" v-if="museums.length > 0" v-for="  museum   in   museums  " :key="museum"
          :museums="fetchMuseums">
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
  </div>
  <div class="pagination__container">
    <pagination :total-pages="totalPages" :current-page="currentPage" @page-changed="handlePaginate"></pagination>
    <div class="select">
      <span>Количество на странице: </span>
      <select :="sortOptions" @change="changeOption">
        <option v-for="  option   in   sortOptions  " key="option.value" :value="option.value">{{ option.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import pagination from "../components/Pagination"
export default {
  components: {
    pagination
  },
  data() {
    return {
      museums: [],
      totalPages: 1,
      perPage: 5,
      currentPage: 1,
      sortBy: 'name',
      sortDesc: false,
      sortOptions: [
        { value: 5, name: '5' },
        { value: 10, name: '10' },
        { value: 15, name: '15' },
      ]
    }
  },
  mounted() {
    this.fetchMuseums(this.currentPage)
  },
  methods: {
    async fetchMuseums(page) {
      axios
        .get(`https://developer3.elros.info/api/v1/museums/?page=${page}&page_size=${this.perPage}&ordering=${this.sortDesc ? '-' : ''}${this.sortBy}`)
        .then((response) => {
          this.museums = response.data.results;
          this.totalPages = Math.ceil(response.data.count / this.perPage);
        }).catch(error => {
          console.error(error)
        })
    },
    sort(field) {
      console.log(field);
      this.sortBy = field
      this.sortDesc = !this.sortDesc
      this.fetchMuseums(this.currentPage)
    },
    handlePaginate(e) {
      this.currentPage = +e
      this.fetchMuseums(this.currentPage)
    },
    deleteMuseum(museum) {
      axios.delete(`https://developer3.elros.info/api/v1/museums/${museum.id}/`)
        .then(response => {
          this.fetchMuseums(this.currentPage)
        })
        .catch(error => {
          console.error(error)
        })
    },
    changeOption(event) {
      this.perPage = event.target.value
      this.fetchMuseums(this.fetchMuseums(this.currentPage))
    }
  },
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

.pagination__container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
</style>