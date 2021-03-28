<template>
  <transition name="modal">
    <div v-if="show" class="modal__layout" @click.self="closeModal">
      <div class="modal">
        <span class="modal__close" @click="closeModal"></span>
        <slot name="title">
          <h3 class="modal__title">Заявка отправлена.</h3>
        </slot>
        <slot name="body">
          <img
            class="modal__content"
            src="../images/success_img.png" alt="Успешная отправка данных">
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalWindow',
  data() {
    return {
      show: false,
    };
  },
  methods: {
    closeModal() {
      this.show = false;
    },
  },
};
</script>

<style>
.modal__layout {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  padding: 40px;
  min-width: 420px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
}

.modal__close {
  position: absolute;
  right: 18px;
  top: 18px;
  width: 25px;
  height: 25px;
  z-index: 6;
}

.modal__close:hover {
  opacity: 1;
}

.modal__close:before, .modal__close:after {
  position: absolute;
  left: 11px;
  content: ' ';
  height: 25px;
  width: 2px;
  background-color: #333333;
}

.modal__close:before {
  transform: rotate(45deg);
}

.modal__close:after {
  transform: rotate(-45deg);
}

.modal__title {
  color: #49423d;
  font-size: 16px;
}

.modal__content {
  margin-bottom: 20px
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 2s
}

.modal-enter, .modal-leave-to {
  opacity: 0
}
</style>
