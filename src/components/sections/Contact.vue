<script setup>
import ContactIcon from '@/components/ui/ContactIcon.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useI18n } from '@/i18n/index.js'

defineProps({
  items: { type: Array, required: true },
})

const { t, pick } = useI18n()
</script>

<template>
  <section id="contact" class="section" aria-labelledby="contact-title">
    <SectionHeader id="contact-title" :title="t('section.contact')" />

    <p class="contact-title">{{ t('contact.title') }}</p>
    <p class="contact-sub">{{ t('contact.subtitle') }}</p>

    <ul class="contacts">
      <li v-for="item in items" :key="item.key">
        <a
          class="contact"
          :href="item.url"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noreferrer noopener' : undefined"
        >
          <ContactIcon :name="item.key" />
          <span class="contact-name">{{ pick(item.name) }}</span>
          <span class="contact-handle mono">{{ item.handle }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.contact-title {
  font-size: var(--text-lg);
  color: var(--text);
}

.contact-sub {
  margin-top: 4px;
}

.contacts {
  display: grid;
  margin-top: 24px;
  border-top: 1px solid var(--line);
}

/* one line per channel: icon, name, address; the address lights on hover */
.contact {
  display: grid;
  grid-template-columns: 18px 96px minmax(0, 1fr);
  align-items: center;
  gap: 16px;
  padding-block: 14px;
  border-bottom: 1px solid var(--line);
  color: var(--text-3);
  transition: color var(--dur) var(--ease);
}

.contact-name {
  color: var(--text);
}

.contact-handle {
  overflow-wrap: anywhere;
  transition: color var(--dur) var(--ease);
}

.contact:hover,
.contact:hover .contact-handle {
  color: var(--accent);
}
</style>
