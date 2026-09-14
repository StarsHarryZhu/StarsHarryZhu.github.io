<template>
  <section id="contact" class="contact-section" aria-label="Contact links">
    <SectionHeader index="06" :title="t('section.contact')" />

    <div class="glass contact-panel reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '100ms' }">
      <header class="contact-head">
        <h3 class="contact-title">{{ t('contact.title') }}</h3>
        <p class="contact-sub">{{ t('contact.subtitle') }}</p>
      </header>

      <div class="contacts-row">
        <a
          v-for="item in items"
          :key="item.key"
          class="contact-link"
          :href="item.url"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noreferrer noopener' : undefined"
        >
          <img
            :src="item.icon"
            alt=""
            class="contact-icon"
            width="96"
            height="96"
          />
          <span class="contact-label">{{ pick(item.name) }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from '@/components/SectionHeader.vue'
import { useI18n } from '@/i18n/index.js'
import { useScrollReveal } from '@/composables/useScrollReveal'

defineProps({
  items: { type: Array, required: true },
})

const { t, pick } = useI18n()
const reveal = useScrollReveal({ rootMargin: '0px 0px -8% 0px' })
</script>

<style scoped>
.contact-panel {
  display: grid;
  gap: 1.2rem;
  padding: clamp(1.5rem, 3vw, 2.2rem);
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

/* ===== 联系方式：玻璃行 ===== */

.contacts-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.8rem;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 3.1rem;
  padding: 0.45rem 0.8rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.18);
  background:
    linear-gradient(150deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02) 60%),
    rgba(255, 255, 255, 0.03);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
  color: var(--text-primary);
  font-size: var(--text-sm);
  font-weight: 500;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    background var(--transition-base);
}

.contact-link:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.34);
  background:
    linear-gradient(150deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04) 60%),
    rgba(255, 255, 255, 0.05);
}

.contact-icon {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: var(--radius-sm);
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
}

.contact-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
