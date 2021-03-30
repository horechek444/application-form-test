<template>
  <div class="container">
    <h1 class="container__title">
      Форма подачи заявки в отдел сервиса и качества
    </h1>
    <div class="container__frame">
      <form
        class="form"
        action="#"
        @submit="onSubmit">
        <fieldset class="form__cover">
          <legend class="form__title">
            Ваш филиал
            <b class="form__require">
              *
            </b>
          </legend>
          <label class="select__label">
            <select
              class="form__select border"
              required
              name="city"
              v-model="formData.city"
              :disabled="formData.online"
            >
              <option disabled value="">
                Выберите город
              </option>
              <option
                v-bind:value="city.id"
                v-for="city in cities"
                :key="city.id">
                {{ city.title }}
              </option>
            </select>
          </label>
          <label class="form__label label__checkbox">
            <input
              class="form__online"
              type="checkbox"
              name="online"
              :required="!formData.city"
              v-model="formData.online"
            >
            <span class="form__checkbox"></span>
            Онлайн
          </label>
        </fieldset>

        <fieldset class="form__cover">
          <legend class="form__title">
            Тема обращения
            <b class="form__require">
              *
            </b>
          </legend>
          <label class="form__label label__radio">
            <input
              class="form__theme"
              type="radio"
              name="theme"
              id="DissatisfiedWithTheQuality"
              value="DissatisfiedWithTheQuality"
              v-model="formData.theme"
              :required="!formData.anotherTheme"
            >
            <span class="form__radio"></span>
            Недоволен качеством услуг
          </label>
          <label class="form__label label__radio">
            <input
              class="form__theme"
              type="radio"
              name="theme"
              id="TerminationOfTheContract"
              value="TerminationOfTheContract"
              v-model="formData.theme"
              :required="!formData.anotherTheme"
            >
            <span class="form__radio"></span>
            Расторжение договора
          </label>
          <label class="form__label label__radio">
            <input
              class="form__theme"
              type="radio"
              name="theme"
              id="DoNotReceive"
              value="DoNotReceive"
              v-model="formData.theme"
              :required="!formData.anotherTheme"
            >
            <span class="form__radio"></span>
            Не приходит письмо активации на почту
          </label>
          <label class="form__label label__radio">
            <input
              class="form__theme"
              type="radio"
              name="theme"
              id="DoNotWork"
              value="DoNotWork"
              v-model="formData.theme"
              :required="!formData.anotherTheme"
            >
            <span class="form__radio"></span>
            Не работает личный кабинет
          </label>
          <label class="form__label">
            <input
              class="form__theme-input border"
              type="text"
              placeholder="Другое"
              v-model="formData.anotherTheme"
              :required="!formData.theme"
            >
          </label>
        </fieldset>

        <fieldset class="form__cover">
          <legend class="form__title">
            Описание проблемы
            <b class="form__require">
              *
            </b>
          </legend>
          <label class="form__label">
            <textarea
              class="form__textarea border"
              name="text"
              cols="30"
              rows="10"
              placeholder="Введите текст"
              v-model="formData.text"
              required>
            </textarea>
          </label>
        </fieldset>

        <fieldset class="form__cover">
          <legend class="form__title">
            Загрузка документов
          </legend>
          <p class="form__text">
            Приложите, пожалуйста, полноэкранный скриншот.
            <br/>Это поможет быстрее решить проблему.
          </p>
          <input
            class="form__file"
            type="file"
            name="file"
            @change="onFileSelected"
          >
        </fieldset>
        <input
          class="form__submit"
          type="submit"
          value="Отправить"
          :disabled="isButtonActive">
      </form>
    </div>
    <ModalWindow ref="modal"></ModalWindow>
  </div>
</template>

<script>
import ModalWindow from './components/modal-window.vue';
import api from './services/api';

export default {
  name: 'App',
  components: {
    ModalWindow,
  },
  data() {
    return {
      cities: null,
      formData: {
        online: null,
        theme: null,
        city: '',
        anotherTheme: '',
        text: '',
        selectedFile: null,
      },
    };
  },
  computed: {
    isButtonActive() {
      if ((this.formData.city || this.formData.city !== '' || this.formData.online)
        && (this.formData.theme || this.formData.anotherTheme) && this.formData.text) {
        return false;
      }
      return true;
    },
  },
  watch: {
    'formData.theme': function (v) {
      if (v) {
        this.formData.anotherTheme = '';
      }
    },
    'formData.anotherTheme': function (v) {
      if (v) {
        this.formData.theme = null;
      }
    },
    'formData.online': function (v) {
      if (v) {
        this.formData.city = '';
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
    sendForm(data) {
      api.sendForm(data)
        .then((json) => {
          if (json.success) {
            this.$refs.modal.show = true;
          } else {
            alert('Ошибка отправки заявки');
          }
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    },
    onFileSelected(event) {
      const file = event.target.files[0];
      const fd = new FormData();
      fd.append('file', file, 'file');
      this.formData.selectedFile = fd;
    },
    onSubmit(event) {
      event.preventDefault();
      console.log(this.formData);
      this.sendForm(this.formData);
      this.formData = {
        online: null,
        theme: null,
        city: '',
        anotherTheme: '',
        text: '',
        selectedFile: null,
      };
    },
  },
};
</script>

<style>
.body {
  margin: 0;
}

.container {
  margin: 0 auto;
  padding: 10px 20px 20px;
  max-width: 1240px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-rendering: optimizeLegibility;
  font-size: 14px;
  color: rgba(128, 128, 128, 1);
}

.container__title {
  margin: 0 0 20px;
  color: #49423d;
}

.border {
  border: 1px solid rgba(211, 211, 211, 1);
  border-radius: 2px;
  padding: 10px;
}

.border:hover {
  border: 1px solid rgba(211, 211, 211, 0.5);
}

.container__frame {
  padding: 30px;
  align-self: stretch;
  border: 1px solid rgba(211, 211, 211, 1);
  border-radius: 2px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form__cover {
  display: flex;
  flex-direction: column;
  margin: 0 0 30px;
  padding: 0;
  border: none;
}

.form__cover:nth-child(3) {
  align-self: stretch;
}

.form__cover:nth-child(3) > .form__label {
  align-self: stretch;
}

.form__label:hover {
  color: rgba(128, 128, 128, 0.5);
}

.form__title {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: normal;
  color: #49423d;
  padding: 0;
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

.form__select:focus {
  outline: none;
  box-shadow: 0 0 0 2px cadetblue;
}

.form__select:disabled {
  background-color: #ededed;
  cursor: default;
}

.form__select:disabled:hover {
  border: 1px solid rgba(211, 211, 211, 1);
}

.select__label {
  display: block;
  position: relative;
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
  pointer-events: none;
}

.form__textarea {
  width: 100%;
  min-width: 100%;
  resize: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  box-sizing: border-box;
}

.form__textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px cadetblue;
}

.form__text {
  margin: 0 0 10px;
}

.form__require {
  color: red;
}

.form__theme-input {
  width: 250px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.form__theme-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px cadetblue;
}

.form__submit {
  padding: 10px 20px;
  text-transform: uppercase;
  background-color: rgba(250, 137, 7, 1);
  color: white;
  border: none;
  box-shadow: none;
  border-radius: 2px;
  font-weight: bold;
}

.form__submit:disabled {
  background-color: lightgrey;
  color: rgba(255, 255, 255, 0.7);
}

.form__submit:focus {
  outline: none;
  box-shadow: 0 0 0 2px cadetblue;
}

.form__submit:hover {
  background-color: rgba(250, 137, 7, 0.5);
}

.form__submit:disabled:hover {
  background-color: lightgrey;
}

.form__online,
.form__theme {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.form__checkbox,
.form__radio {
  position: absolute;
  width: 14px;
  height: 14px;
  border: 1px solid rgba(73, 66, 61, 1);;
  border-radius: 1px;
  background-color: transparent;
  margin-left: -28px;
}

.form__checkbox:hover,
.form__radio:hover {
  border: 1px solid rgba(73, 66, 61, 0.5);
}

.form__radio {
  border-radius: 50%;
}

.label__checkbox,
.label__radio {
  padding-left: 28px;
}

.label__radio {
  margin-bottom: 15px;
}

.form__theme:checked + .form__radio,
.form__online:checked + .form__checkbox {
  background-position: center;
  background-repeat: no-repeat;
}

.form__theme:checked + .form__radio {
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" height="100" width="100"%3E%3Ccircle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="black" /%3E%3C/svg%3E');
  background-size: 70%;
}

.form__online:checked + .form__checkbox {
  background-image: url('images/check-mark-black.svg');
  background-size: 75%;
}

.form__theme:focus + .form__radio,
.form__online:focus + .form__checkbox {
  outline: none;
  box-shadow: 0 0 0 2px cadetblue;
}

.form__theme:disabled + .form__radio,
.form__online:disabled + .form__checkbox {
  border: 1px solid lightgrey;
}

.form__theme:checked:disabled + .form__radio {
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" height="100" width="100"%3E%3Ccircle cx="50" cy="50" r="40" stroke="lightgrey" stroke-width="3" fill="lightgrey" /%3E%3C/svg%3E');
}

.form__online:checked:disabled + .form__checkbox {
  background-image: url('images/check-mark-disabled.svg');
}

.form__file:focus {
  outline: none;
  box-shadow: 0 0 0 2px cadetblue;
}
</style>
