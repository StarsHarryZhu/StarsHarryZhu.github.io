<template>
  <section ref="root" id="contact" class="contact-section" aria-label="Contact links">
    <SectionHeader index="06" title="Contact" />

    <div class="panel contact-panel reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '100ms' }">
      <span class="panel-halo" aria-hidden="true"></span>

      <header class="contact-head">
        <h3 class="contact-title">Get in Touch</h3>
        <p class="contact-sub">Open to internships &amp; collaborations</p>
      </header>

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
import SectionHeader from '@/components/SectionHeader.vue'
import { useCopyToast } from '@/composables/useCopyToast'
import { useParticleField } from '@/composables/useParticleField'
import { useRipple } from '@/composables/useRipple'
import { useScrollReveal } from '@/composables/useScrollReveal'

const props = defineProps({
  items: { type: Array, required: true },
})

const root = useTemplateRef('root')
const reveal = useScrollReveal({ rootMargin: '0px 0px -8% 0px' })
const { isModalOpen, modalText, copyText } = useCopyToast()

// Gas-mote burst at the pressed button — the field is mounted by the background.
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
.contact-section {
  scroll-margin-top: calc(var(--nav-height) + 1rem);
}

.contact-panel {
  display: grid;
  gap: 1.2rem;
  padding: clamp(1.4rem, 3vw, 2.2rem);
  margin-top: 1.1rem;
}

.contact-head {
  display: grid;
  gap: 0.3rem;
}

.contact-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2.6vw, 1.6rem);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
}

.contact-sub {
  margin: 0;
  color: var(--text-tertiary);
  font-size: var(--text-sm);
}

/* ===== Buttons ===== */

.contacts-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 0.85rem;
}

.contact-btn {
  --ripple-color: var(--accent-cyan);
  width: 100%;
  min-height: 3.2rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.24);
  background:
    radial-gradient(120% 140% at 20% -30%, rgba(255, 255, 255, 0.16), transparent 55%),
    linear-gradient(150deg, rgba(255, 255, 255, 0.07), transparent 55%),
    rgba(35, 35, 36, 0.2);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.24),
    0 8px 26px -12px rgba(2, 6, 26, 0.8);
  color: var(--text-primary);
  font: inherit;
  font-size: var(--text-sm);
  font-weight: 500;
  appearance: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.56rem;
  padding: 0.42rem 0.7rem;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);
}

.contact-btn:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.36);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    0 12px 30px -12px rgba(2, 6, 26, 0.85),
    0 0 24px rgba(125, 244, 232, 0.18);
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

/* ===== Toast: liquid glass, spring in · gaseous blur-dissolve out ===== */

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
  padding: 0.62rem 0.98rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.22);
  background:
    linear-gradient(150deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03) 55%),
    rgba(35, 35, 36, 0.55);
  backdrop-filter: blur(18px) saturate(1.6) brightness(1.08);
  color: var(--text-primary);
  text-align: center;
  font-size: var(--text-sm);
  font-weight: 500;
  line-height: 1.35;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    var(--shadow-lift),
    0 0 22px rgba(103, 158, 254, 0.1);
}

.toast-enter-active {
  transition:
    opacity 0.18s var(--ease-aero),
    transform 0.38s var(--ease-spring);
}

.toast-leave-active {
  transition:
    opacity 0.35s var(--ease-aero),
    transform 0.35s var(--ease-aero),
    filter 0.35s var(--ease-aero);
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
