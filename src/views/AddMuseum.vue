<template>
  <div class="container">
    <h2>Место проведение детально</h2>
    <div class="form__container">
      <form @submit.prevent="checkForm" method="post">
        <div class="form__inputs">
          <label for="name">
            <span>Полное имя</span>
            <input ref="nameEl" v-model:="name" name="name" type="text" placeholder="Введите имя" required>
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
          <!-- <router-link class="router-link btn__back" to="/">Назад</router-link> -->
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
    // checkForm() {
    //   const errors = document.querySelectorAll('.error')
    //   if (this.form.name && this.form.short_name && this.form.description) {
    //     axios.post('https://developer3.elros.info/api/v1/museums/2/', {
    //       name: this.form.name,
    //       short_name: this.form.short_name,
    //       description: this.form.description,
    //       is_active: this.form.is_active
    //     }).then(response => {
    //       this.museums.push(response.data.results)
    //       this.$router.push('/')
    //     }).catch(error => {
    //       console.error(error)
    //     })
    //   } else if (!this.form.name) {
    //     errors[0].style.display = 'inline-block'
    //   } else if (!this.form.short_name) {
    //     errors[0].style.display = 'none'
    //     errors[1].style.display = 'inline-block'
    //   } else if (!this.form.description) {
    //     errors[0].style.display = 'none'
    //     errors[1].style.display = 'none'
    //     errors[2].style.display = 'inline-block'
    //   }
    // },
    checkForm() {
      this.validateForm()
      if (Object.keys(this.errors).length === 0) {
        axios.post('https://developer3.elros.info/api/v1/museums/2/', {
          name: this.name,
          short_name: this.short_name,
          description: this.description,
          is_active: this.is_active
        }).then(response => {
          this.museums.push(response.data.results)
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
      this.errors = {} // Очищаем объект с ошибками
      if (!this.name) { // Если название музея пустое
        this.errors.name = 'Обязательное поле' // Добавляем ошибку в объект
      }
      if (!this.short_name) { // Если город музея пустой
        this.errors.short_name = 'Обязательное поле' // Добавляем ошибку в объект
      }
      if (!this.description) { // Если страна музея пустая
        this.errors.description = 'Обязательное поле' // Добавляем ошибку в объект
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