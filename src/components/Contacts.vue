<template>
  <div class="contacts-wrap">
    <section class="contacts" :style="{ '--cols': String(columns) }">
      <component
        :is="item.type === 'copy' ? 'button' : 'a'"
        v-for="(item, index) in items"
        :key="`contact-${index}`"
        class="contact-btn"
        :type="item.type === 'copy' ? 'button' : undefined"
        :href="item.type !== 'copy' ? item.url : undefined"
        :target="item.type !== 'copy' ? '_blank' : undefined"
        :rel="item.type !== 'copy' ? 'noreferrer noopener' : undefined"
        :aria-label="item.ariaLabel || item.name || altText"
        @click="item.type === 'copy' ? copyText(item.copyValue, item.copySuccessText) : undefined"
      >
        <img
          v-if="item.icon"
          :src="item.icon"
          :alt="altText"
          class="contact-icon"
          width="96"
          height="96"
        />
        <span v-else class="contact-icon contact-icon-fallback" aria-hidden="true">@</span>
        <span>{{ item.name }}</span>
      </component>
    </section>

    <Teleport to="body">
      <Transition name="copy-modal">
        <div v-if="isModalOpen" class="copy-modal-layer" aria-hidden="true">
          <div class="copy-modal-card" role="status" aria-live="polite">
            {{ modalText }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
})

const columns = computed(() => {
  const count = Array.isArray(props.items) ? props.items.length : 0
  return Math.min(Math.max(count, 1), 6)
})

const modalText = ref('')
const isModalOpen = ref(false)
let modalTimer = null

const clearModalTimer = () => {
  if (modalTimer !== null) {
    clearTimeout(modalTimer)
    modalTimer = null
  }
}

const showModal = (text) => {
  modalText.value = text
  isModalOpen.value = true
  clearModalTimer()
  modalTimer = setTimeout(() => {
    isModalOpen.value = false
    modalTimer = null
  }, 500)
}

const copyText = async (value, successText = 'Email copied successfully.') => {
  if (!value) return

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = value
      textArea.setAttribute('readonly', '')
      textArea.style.position = 'absolute'
      textArea.style.left = '-9999px'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    showModal(successText)
  } catch {
    showModal('Unable to copy email.')
  }
}

onBeforeUnmount(() => {
  clearModalTimer()
})
</script>

<style scoped>
.contacts-wrap {
  display: grid;
  gap: 0.48rem;
}

.contacts {
  display: grid;
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  gap: 0.7rem;
}

.contact-btn {
  width: 100%;
  min-height: 2.24rem;
  border-radius: 12px;
  border: 1px solid rgba(140, 199, 248, 0.32);
  background: rgba(14, 25, 40, 0.78);
  color: #e3efff;
  font: inherit;
  appearance: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.54rem;
  padding: 0.3rem 0.56rem;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
  border-color: rgba(176, 224, 255, 0.62);
}

.contact-icon {
  width: 1.48rem;
  height: 1.48rem;
  display: block;
  border-radius: 7px;
  flex-shrink: 0;
  object-fit: cover;
  object-position: center;
}

.contact-icon-fallback {
  display: inline-flex;
  border: 1px solid rgba(137, 190, 243, 0.5);
  background: rgba(52, 120, 189, 0.2);
  color: #d8ecff;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  line-height: 1;
}

.contact-btn span {
  font-size: 0.8rem;
}

.copy-modal-layer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  z-index: 1200;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.copy-modal-card {
  min-width: min(460px, calc(100vw - 2rem));
  max-width: calc(100vw - 2rem);
  padding: 0.58rem 0.9rem;
  border-radius: 12px;
  border: 1px solid rgba(162, 211, 252, 0.5);
  background: rgba(6, 16, 31, 0.95);
  color: #d7ebff;
  text-align: center;
  font-size: 0.84rem;
  line-height: 1.35;
  box-shadow: 0 14px 32px rgba(1, 7, 17, 0.42);
}

.copy-modal-enter-active,
.copy-modal-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.copy-modal-enter-from,
.copy-modal-leave-to {
  opacity: 0;
  transform: translateY(22px);
}

.copy-modal-enter-to,
.copy-modal-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
