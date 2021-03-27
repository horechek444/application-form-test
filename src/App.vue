<template>
  <div class="container">
    <h1 class="container__title">Форма подачи заявки в отдел сервиса и качества</h1>
    <div class="container__frame border">
      <form action="#">
        <div class="form__cover">
          <h2 class="form__title">
            Ваш филиал <b class="form__require">*</b>
          </h2>
          <label class="select__label">
            <select
              class="form__select border"
              required
              name="select"
              v-model="selected"
              :disabled="checked">
              <option disabled value="Выберите город">Выберите город</option>
              <option
                v-bind:value="city.title"
                v-for="city in cities"
                :key="city.id">
                {{ city.title }}
              </option>
            </select>
          </label>
          <label for="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              name="online"
              v-model="checked">Онлайн
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
              v-model="picked"
              required>
            Недоволен качеством услуг
          </label>
          <label>
            <input
              class="form__theme"
              type="radio"
              name="theme"
              value="contract cancellation"
              v-model="picked">
            Расторжение договора
          </label>
          <label>
            <input
              class="form__theme"
              type="radio"
              name="theme"
              value="no activation email"
              v-model="picked">
            Не приходит письмо активации на почту
          </label>
          <label>
            <input
              class="form__theme"
              type="radio"
              name="theme"
              value="personal account doesn't work"
              v-model="picked">
            Не работает личный кабинет
          </label>
          <label>
            <input
              class="form__theme-input border"
              type="text"
              placeholder="Другое"
              v-model="anotherTheme">
          </label>
        </div>

        <div class="form__cover">
          <h2 class="form__title">
            Описание проблемы <b class="form__require">*</b>
          </h2>
          <label>
            <textarea
              class="form__textarea border"
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Введите текст"
              v-model="text"
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
      checked: null,
      picked: null,
      selected: 'Выберите город',
      anotherTheme: '',
      text: '',
    };
  },
  watch: {
    picked(v) {
      if (v) {
        this.anotherTheme = '';
      }
    },
    anotherTheme(v) {
      if (v) {
        this.picked = null;
      }
    },
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
    handleCheckbox() {
      if (!this.checked) {
        this.selected = 'Выберите город';
      }
    },
    // handleSubmit(data) {
    //   return
    //   !!((this.selected || this.checked) && (this.picked || this.anotherTheme) && this.text);
    // }
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
  color: gray;
}

.container__title {
  margin: 0 0 20px;
  color: #49423d;
}

.border {
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 10px;
}

.container__frame {
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
  color: #49423d;
}

.form__select {
  align-self: flex-start;
  margin-bottom: 10px;
  width: 250px;
  color: gray;
  font-size: 14px;
  appearance: none;
  cursor: pointer;
}

.select__label {
  display: block;
  position: relative;
  align-self: flex-start;
}

.select__label::after {
  content: "";
  position: absolute;
  top: 13px;
  left: 220px;
  background-image: url("./images/down-arrow.svg");
  background-size: contain;
  background-repeat: no-repeat;
  width: 25px;
  height: 15px;
  z-index: 3;
  pointer-events: none;
}

.form__textarea {
  width: 100%;
  resize: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  box-sizing: border-box;
}

.form__text {
  margin: 0 0 10px;
}

.form__require {
  color: red;
}

.form__theme {
  margin-bottom: 15px;
  align-self: flex-start;
}

.form__theme-input {
  width: 250px;
  box-sizing: border-box;
  font-size: 14px;
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
