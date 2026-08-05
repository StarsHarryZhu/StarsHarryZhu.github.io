<template>
  <section ref="root" class="contacts" aria-label="Contact links">
    <SectionHeader overline="Contact" title="Get in Touch" accent="cyan" />

    <div class="contacts-row">
      <component
        :is="item.tag"
        v-for="(item, index) in resolvedItems"
        :key="`contact-${index}`"
        class="contact-btn"
        v-bind="item.tagProps"
        :aria-label="item.ariaLabel || item.name"
        @pointerdown="onPress"
        @click="item.onClick"
      >
        <img
          :src="item.icon"
          alt=""
          class="contact-icon"
          width="96"
          height="96"
        />
        <span>{{ item.name }}</span>
      </component>
    </div>

    <Teleport to="body">
      <Transition name="toast">
        <div v-if="isModalOpen" class="toast" role="status" aria-live="polite">
          <div class="toast-card">{{ modalText }}</div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, useTemplateRef } from 'vue'
import SectionHeader from './SectionHeader.vue'
import { useCopyToast } from '@/composables/useCopyToast'
import { useParticleField } from '@/composables/useParticleField'
import { useRipple } from '@/composables/useRipple'

const props = defineProps({
  items: { type: Array, required: true },
})

const root = useTemplateRef('root')
const { isModalOpen, modalText, copyText } = useCopyToast()

// Firefly burst at the pressed button — the field is mounted by the background.
const { burst } = useParticleField()

useRipple(() => root.value, { selector: '.contact-btn' })

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

function onPress(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 10)
}
</script>

<style scoped>
.contacts {
  display: grid;
  gap: var(--space-5);
}

.contacts-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.8rem;
}

/* ===== Glass pill button ===== */

.contact-btn {
  width: 100%;
  min-height: 2.75rem;
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  background:
    linear-gradient(155deg, rgba(120, 170, 255, 0.07), transparent 46%),
    rgba(13, 22, 54, 0.42);
  backdrop-filter: blur(14px) saturate(1.4);
  box-shadow:
    var(--glass-highlight),
    var(--glass-shade),
    var(--shadow-float);
  color: var(--text-primary);
  font: inherit;
  font-size: var(--text-sm);
  appearance: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.54rem;
  padding: 0.4rem 0.64rem;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);
}

.contact-btn:hover {
  transform: translateY(-3px);
  border-color: var(--glass-border-hover);
  box-shadow:
    var(--glass-highlight),
    var(--glass-shade),
    var(--shadow-lift),
    0 0 22px rgba(125, 244, 232, 0.18);
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

/* ===== Toast: floating glass, spring in · gaseous blur-dissolve out ===== */

.toast {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  z-index: var(--z-toast);
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.toast-card {
  min-width: min(360px, calc(100vw - 2rem));
  max-width: calc(100vw - 2rem);
  padding: 0.6rem 0.95rem;
  border-radius: 16px;
  border: 1px solid rgba(125, 244, 232, 0.4);
  background: rgba(7, 12, 38, 0.86);
  color: var(--text-primary);
  text-align: center;
  font-size: var(--text-sm);
  line-height: 1.35;
  box-shadow:
    0 0 22px rgba(125, 244, 232, 0.14),
    0 14px 32px rgba(2, 5, 24, 0.55);
  backdrop-filter: blur(28px) saturate(1.4);
}

.toast-enter-active {
  transition:
    opacity 0.18s var(--ease-flow),
    transform 0.38s var(--ease-spring);
}

.toast-leave-active {
  transition:
    opacity 0.35s var(--ease-flow),
    transform 0.35s var(--ease-flow),
    filter 0.35s var(--ease-flow);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(18px) scale(0.92);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(6px) scale(0.94);
  filter: blur(12px);
}
</style>
