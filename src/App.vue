<template>
  <div class="container">
    <h1 class="container__title">Форма подачи заявки в отдел сервиса и качества</h1>
    <div class="container__frame">
      <form action="#">
        <div class="form__cover">
          <h2 class="form__title">
            Ваш филиал <b class="form__require">*</b>
          </h2>
          <label>
            <select class="form__select" name="select" required>
              <option>Выберите город</option>
              <option value="Волжский" v-for="city in cities" :key="city.id">
                {{ city.title }}
              </option>
            </select>
          </label>
          <label for="checkbox">
            <input type="checkbox" id="checkbox" name="online" v-model="checked">Онлайн
          </label>
        </div>
        <div class="form__cover">
          <h2 class="form__title">
            Тема обращения <b class="form__require">*</b>
          </h2>
          <label>
            <input
              class="form__theme"
              type="radio"
              name="theme"
              value="bad quality"
              required>
            Недоволен качеством услуг
          </label>
          <label>
            <input
              class="form__theme"
              type="radio"
              name="theme"
              value="contract cancellation">
            Расторжение договора
          </label>
          <label>
            <input
              class="form__theme"
              type="radio"
              name="theme"
              value="no activation email">
            Не приходит письмо активации на почту
          </label>
          <label>
            <input
              class="form__theme"
              type="radio"
              name="theme"
              value="personal account doesn't work">
            Не работает личный кабинет
          </label>
          <label>
            <input type="text" placeholder="Другое">
          </label>
        </div>
        <div class="form__cover">
          <h2 class="form__title">
            Описание проблемы <b class="form__require">*</b>
          </h2>
          <label>
            <textarea
              class="form__textarea"
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Введите текст"
              required>
            </textarea>
          </label>
        </div>
        <div class="form__cover">
          <h2 class="form__title">
            Загрузка документов
          </h2>
          <p class="form__text">Приложите, пожалуйста, полноэкранный скриншот.
            <br/>Это поможет быстрее решить проблему.
          </p>
          <input type="file">
        </div>
        <input class="form__submit" type="submit" value="Отправить">
      </form>
    </div>
  </div>
</template>

<script>

import api from './services/api';

export default {
  name: 'App',
  components: {},
  data() {
    return {
      cities: null,
      checked: false,
    };
  },
  created() {
    this.getCities();
  },
  methods: {
    async getCities() {
      try {
        this.cities = await api.getCities();
      } catch (err) {
        console.log(`${err}`);
      }
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1240px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #49423d;
}

.container__title {
  margin: 0 0 20px;
}

.container__frame {
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 30px;
}

.form__cover {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

.form__title {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: normal;
}

.form__select {
  align-self: flex-start;
  margin-bottom: 10px;
}

.form__textarea {
  width: 100%;
}

.form__text {
  margin: 0 0 10px;
  color: gray;
}

.form__require {
  color: red;
}

.form__theme {
  margin-bottom: 15px;
}

.form__submit {
  padding: 10px 20px;
  text-transform: uppercase;
  background-color: coral;
  color: white;
  border: none;
  box-shadow: none;
  border-radius: 2px;
  font-weight: bold;
}
</style>
