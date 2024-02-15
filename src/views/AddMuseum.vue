<template>
  <div class="container">
    <h2>Место проведение детально</h2>
    <div class="form__container">
      <form @submit.prevent="checkForm" method="post">
        <div class="form__inputs">
          <label for="name">
            <span>Полное имя</span>
            <input ref="nameEl" v-model="name" name="name" type="text" placeholder="Введите имя" required>
            <p v-if="errors.name" class="error">{{ errors.name }}</p>
          </label>
          <label for="short_name">
            <span>Короткое имя</span>
            <input ref="short_nameEl" v-model="short_name" name="short_name" type="text"
              placeholder="Введите короткое имя" required>
            <p v-if="errors.short_name" class="error">{{ errors.short_name }}</p>
          </label>
          <label for="description">
            <span>Описание</span>
            <textarea ref="descriptionEl" v-model="description" name="description" placeholder="Введите описание"
              required></textarea>
            <p v-if="errors.description" class="error">{{ errors.description }}</p>
          </label>
        </div>
        <div class="btns">
          <button @click="goBack" class="router-link btn__back">Назад</button>
          <button type="submit" class="btn__add">Создать</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      name: '',
      short_name: '',
      description: '',
      is_active: true,
      errors: {}
    }
  },
  methods: {
    checkForm() {
      this.validateForm()
      if (Object.keys(this.errors).length === 0) {
        axios.post('https://developer3.elros.info/api/v1/museums/', {
          name: this.name,
          short_name: this.short_name,
          description: this.description,
          is_active: this.is_active,
          addresses: []
        }).then(response => {
          this.$router.push('/')
        }).catch(error => {
          console.error(error)
        })
      }
    },
    goBack() {
      this.$router.back()
    },
    validateForm() {
      this.errors = {}
      if (!this.name) {
        this.errors.name = 'Обязательное поле'
      }
      if (!this.short_name) {
        this.errors.short_name = 'Обязательное поле'
      }
      if (!this.description) {
        this.errors.description = 'Обязательное поле'
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}

h2 {
  margin-bottom: 40px;
}

.form__inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

label {
  width: 100%;
  margin-bottom: 50px;
}

span {
  display: block;
  margin-bottom: 10px;
}

input {
  height: 50px;
}

textarea {
  height: 100px;
}

input,
textarea {
  width: 100%;
  border: none;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
}

input:focus,
textarea:focus {
  background-color: #F0F0F0;
  border: 1px solid black;
}

.error {
  display: none;
  color: red;
  margin-top: 10px;
  padding-left: 11px;
  font-weight: bold;
  font-size: 18px;
}

.btns {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
}

.btn__back {
  background-color: #E6F1FC;
  color: #57A6EF;
}
</style>