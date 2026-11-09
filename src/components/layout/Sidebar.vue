<script setup>
import ContactIcon from '@/components/ui/ContactIcon.vue'
import LanguageToggle from '@/components/layout/LanguageToggle.vue'
import { useI18n } from '@/i18n/index.js'

defineProps({
  profile: { type: Object, required: true },
  contacts: { type: Array, required: true },
  avatar: { type: Object, required: true },
  /** section ids in page order; each has a `section.<id>` title */
  sections: { type: Array, required: true },
  /** id of the section the reader is in */
  active: { type: String, required: true },
})

const emit = defineEmits(['navigate'])

const { t, pick } = useI18n()
</script>

<template>
  <header class="sidebar rise">
    <div class="sb-top">
      <div class="sb-id">
        <picture>
          <source type="image/webp" :srcset="`${avatar.webp} 1x, ${avatar.webp2x} 2x`" />
          <img class="sb-avatar" :src="avatar.fallback" alt="" width="44" height="44" />
        </picture>
        <span class="mono">{{ profile.title.toLowerCase() }}</span>
      </div>

      <h1 class="sb-name">{{ profile.name }}</h1>
      <p class="sb-role">{{ pick(profile.subtitle) }}</p>
      <p class="sb-meta">{{ pick(profile.meta) }}</p>

      <p class="sb-status mono">
        <i class="sb-status-dot" aria-hidden="true"></i>
        {{ t('profile.status') }}
      </p>

      <nav class="sb-nav" :aria-label="t('nav.label')">
        <ul>
          <li v-for="id in sections" :key="id">
            <a
              :href="`#${id}`"
              class="sb-link"
              :class="{ 'is-active': active === id }"
              :aria-current="active === id ? 'true' : undefined"
              @click="emit('navigate', id)"
            >
              <span class="sb-line" aria-hidden="true"></span>
              <span class="sb-label">{{ t(`section.${id}`) }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="sb-bottom">
      <ul class="sb-contacts">
        <li v-for="item in contacts" :key="item.key">
          <a
            class="sb-contact"
            :href="item.url"
            :aria-label="pick(item.name)"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noreferrer noopener' : undefined"
          >
            <ContactIcon :name="item.key" />
          </a>
        </li>
      </ul>
      <LanguageToggle />
    </div>
  </header>
</template>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  height: 100dvh;
  padding-block: 96px 64px;
}

.sb-id {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.sb-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}

.sb-name {
  font-size: var(--text-name);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.sb-role {
  margin-top: 12px;
  font-size: var(--text-lg);
  color: var(--text);
  text-wrap: balance;
}

.sb-meta {
  margin-top: 4px;
}

.sb-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
}

.sb-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}

/* ===== Section nav ===== */

.sb-nav {
  margin-top: 56px;
}

.sb-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-block: 8px;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--text-3);
  transition: color var(--dur) var(--ease);
}

/* For the current section the line doubles (scaleX) and the label moves
   along with its end (translateX): compositor-only, no layout. */
.sb-line {
  width: 48px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0.5);
  transform-origin: left center;
  transition: transform var(--dur) var(--ease);
}

.sb-label {
  transform: translateX(-24px);
  transition: transform var(--dur) var(--ease);
}

.sb-link:hover {
  color: var(--text);
}

.sb-link.is-active {
  color: var(--accent);
}

.sb-link:hover .sb-line,
.sb-link.is-active .sb-line {
  transform: scaleX(1);
}

.sb-link:hover .sb-label,
.sb-link.is-active .sb-label {
  transform: none;
}

/* ===== Contacts and language ===== */

.sb-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.sb-contacts {
  display: flex;
  gap: 4px;
  margin-left: -8px;
}

.sb-contact {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  color: var(--text-3);
  transition: color var(--dur) var(--ease);
}

.sb-contact:hover {
  color: var(--text);
}

/* ===== One column: the sidebar becomes the page head, without the nav ===== */

@media (max-width: 1023px) {
  .sidebar {
    position: static;
    height: auto;
    padding-block: 64px 24px;
  }

  .sb-nav {
    display: none;
  }

  .sb-bottom {
    margin-top: 32px;
  }
}

@media print {
  .sidebar {
    position: static;
    height: auto;
    padding-block: 0 24px;
  }

  .sb-nav,
  .sb-bottom {
    display: none;
  }
}
</style>
