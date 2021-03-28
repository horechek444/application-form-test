<template>
  <div class="container">
    <h1 class="container__title">Форма подачи заявки в отдел сервиса и качества</h1>
    <div class="container__frame border">
      <form action="#" @submit="onSubmit">
        <div class="form__cover">
          <h2 class="form__title">
            Ваш филиал <b class="form__require">*</b>
          </h2>
          <label class="select__label form__label">
            <select
              class="form__select border"
              required
              name="select"
              v-model="formData.selected"
              :disabled="formData.checked">
              <option disabled value="">Выберите город</option>
              <option
                v-bind:value="city.title"
                v-for="city in cities"
                :key="city.id">
                {{ city.title }}
              </option>
            </select>
          </label>
          <label class="form__label" for="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              name="online"
              :required="!formData.selected"
              v-model="formData.checked">Онлайн
          </label>
        </div>

        <div class="form__cover">
          <h2 class="form__title">
            Тема обращения <b class="form__require">*</b>
          </h2>
          <label class="form__label">
            <input
              class="form__theme"
              type="radio"
              name="theme"
              value="Недоволен качеством услуг"
              v-model="formData.picked"
              :required="!formData.anotherTheme">
            Недоволен качеством услуг
          </label>
          <label class="form__label">
            <input
              class="form__theme"
              type="radio"
              name="theme"
              value="Расторжение договора"
              v-model="formData.picked"
              :required="!formData.anotherTheme">
            Расторжение договора
          </label>
          <label class="form__label">
            <input
              class="form__theme"
              type="radio"
              name="theme"
              value="Не приходит письмо активации на почту"
              v-model="formData.picked"
              :required="!formData.anotherTheme">
            Не приходит письмо активации на почту
          </label>
          <label class="form__label">
            <input
              class="form__theme"
              type="radio"
              name="theme"
              value="Не работает личный кабинет"
              v-model="formData.picked"
              :required="!formData.anotherTheme">
            Не работает личный кабинет
          </label>
          <label class="form__label">
            <input
              class="form__theme-input border"
              type="text"
              placeholder="Другое"
              v-model="formData.anotherTheme"
              :required="!formData.picked">
          </label>
        </div>

        <div class="form__cover">
          <h2 class="form__title">
            Описание проблемы <b class="form__require">*</b>
          </h2>
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
        </div>

        <div class="form__cover">
          <h2 class="form__title">
            Загрузка документов
          </h2>
          <p class="form__text">Приложите, пожалуйста, полноэкранный скриншот.
            <br/>Это поможет быстрее решить проблему.
          </p>
          <input type="file" @change="onFileSelected">
        </div>
        <input
          class="form__submit"
          type="submit"
          value="Отправить"
          :disabled="(!formData.selected || !formData.checked) &&
          (!formData.picked || !formData.anotherTheme) && !formData.text">
      </form>
    </div>
    <modal-window ref="modal"></modal-window>
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
        checked: null,
        picked: null,
        selected: '',
        anotherTheme: '',
        text: '',
        selectedFile: null,
      },
    };
  },
  watch: {
    'formData.picked': function (v) {
      if (v) {
        this.formData.anotherTheme = '';
      }
    },
    'formData.anotherTheme': function (v) {
      if (v) {
        this.formData.picked = null;
      }
    },
    'formData.checked': function (v) {
      if (v) {
        this.formData.selected = '';
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
          console.log(err);
        });
    },
    onFileSelected(event) {
      this.formData.selectedFile.files[0] = event.target;
    },
    onSubmit(event) {
      event.preventDefault();
      console.log(this.formData);
      this.sendForm(JSON.stringify(this.formData));
      this.formData = {
        checked: null,
        picked: null,
        selected: '',
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
  align-self: stretch;
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

.form__submit:disabled {
  background-color: lightgrey;
  color: rgba(255, 255, 255, 0.7);
}
</style>
