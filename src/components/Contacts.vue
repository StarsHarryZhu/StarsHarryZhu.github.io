<template>
  <div class="contacts-wrap">
    <section class="contacts" :style="{ '--cols': String(columns) }" aria-label="Contact links">
      <component
        :is="item.tag"
        v-for="(item, index) in resolvedItems"
        :key="`contact-${index}`"
        class="contact-btn glass-card"
        v-bind="item.tagProps"
        :aria-label="item.ariaLabel || item.name"
        @click="item.onClick"
      >
        <img
          v-if="item.icon"
          :src="item.icon"
          alt=""
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
        <div v-if="isModalOpen" class="copy-modal-layer" role="status" aria-live="polite">
          <div class="copy-modal-card">
            {{ modalText }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCopyToast } from '@/composables/useCopyToast'

const props = defineProps({
  items: { type: Array, required: true },
})

const { isModalOpen, modalText, copyText } = useCopyToast()

const columns = computed(() => {
  const count = Array.isArray(props.items) ? props.items.length : 0
  return Math.min(Math.max(count, 1), 6)
})

const resolvedItems = computed(() =>
  props.items.map((item) => {
    if (item.type === 'copy') {
      return {
        ...item,
        tag: 'button',
        tagProps: { type: 'button' },
        ariaLabel: `Copy ${item.name} address to clipboard`,
        onClick: () => copyText(item.copyValue, item.copySuccessText),
      }
    }
    return {
      ...item,
      tag: 'a',
      tagProps: {
        href: item.url,
        target: '_blank',
        rel: 'noreferrer noopener',
      },
      ariaLabel: `Visit ${item.name} profile`,
      onClick: undefined,
    }
  }),
)
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
  min-height: 2.5rem;
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font: inherit;
  font-size: var(--text-sm);
  appearance: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.54rem;
  padding: 0.4rem 0.64rem;
}

.contact-btn:focus-visible {
  outline: 2px solid var(--color-accent-cyan);
  outline-offset: 2px;
}

.contact-icon {
  width: 1.48rem;
  height: 1.48rem;
  display: block;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
  object-fit: cover;
  object-position: center;
}

.contact-icon-fallback {
  display: inline-flex;
  border: 1px solid var(--glass-border);
  background: var(--color-accent-cyan-dim);
  color: var(--color-accent-cyan);
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  line-height: 1;
}

/* ===== Toast ===== */

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
  min-width: min(360px, calc(100vw - 2rem));
  max-width: calc(100vw - 2rem);
  padding: 0.58rem 0.9rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-accent-cyan);
  background: var(--color-void-900);
  color: var(--color-text-primary);
  text-align: center;
  font-size: var(--text-sm);
  line-height: 1.35;
  box-shadow: var(--shadow-glow-cyan), 0 14px 32px rgba(1, 7, 17, 0.5);
  backdrop-filter: blur(12px);
}

.copy-modal-enter-active {
  transition: opacity 0.18s ease, transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.copy-modal-leave-active {
  transition: opacity 0.18s ease, transform 0.2s ease;
}

.copy-modal-enter-from {
  opacity: 0;
  transform: translateY(18px) scale(0.92);
}

.copy-modal-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
