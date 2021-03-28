<template>
  <transition name="modal">
    <div v-if="show" class="modal-shadow" @click.self="closeModal">
      <div class="modal">
        <span class="modal-close" @click="closeModal"></span>
        <slot name="title">
          <h3 class="modal-title">Заявка отправлена.</h3>
        </slot>
        <slot name="body">
          <div class="modal-content">
            <img src="../images/success_img.png" alt="Успешная отправка данных">
          </div>
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
.modal-shadow {
  position: absolute;
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

.modal-close {
  position: absolute;
  right: 18px;
  top: 18px;
  width: 25px;
  height: 25px;
  z-index: 6;
}
.modal-close:hover {
  opacity: 1;
}
.modal-close:before, .modal-close:after {
  position: absolute;
  left: 11px;
  content: ' ';
  height: 25px;
  width: 2px;
  background-color: #333333;
}
.modal-close:before {
  transform: rotate(45deg);
}
.modal-close:after {
  transform: rotate(-45deg);
}
.modal-title {
  color: #49423d;
  font-size: 16px;
}

.modal-content {
  margin-bottom: 20px
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 2s
}

.modal-enter, .modal-leave-to {
  opacity: 0
}
</style>
