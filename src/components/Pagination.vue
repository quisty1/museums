<template>
  <div>
    <ul class="pagination">
      <li :class="{ disabled: currentPage === 1 }">
        <a @click.prevent="changePage(currentPage - 1)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
        <a @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li :class="{ disabled: currentPage === totalPages }">
        <a @click.prevent="changePage(currentPage + 1)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('page-changed', page);
      }
    },
  },
};
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination li {
  display: inline-block;
  margin: 0 5px;
}

.pagination li.disabled a {
  pointer-events: none;
  cursor: default;
  color: #999;
}

.pagination li a {
  display: block;
  padding: 5px 10px;
  text-decoration: none;
  color: #333;
}

.pagination li.active a {
  background-color: #333;
  color: #fffF;
}

a {
  cursor: pointer;
}
</style>