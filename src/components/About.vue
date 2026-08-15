<template>
  <section id="about" class="about-section" aria-label="About">
    <SectionHeader index="01" title="About" />

    <div class="about-grid">
      <article class="panel about-panel reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '100ms' }">
        <span class="panel-halo" aria-hidden="true"></span>
        <p v-for="(bio, index) in bios" :key="`bio-${index}`" class="about-bio">
          {{ bio }}
        </p>

        <div class="about-socials">
          <a
            v-for="item in socialItems"
            :key="item.name"
            :href="item.url"
            target="_blank"
            rel="noreferrer noopener"
            class="social-btn"
            :aria-label="`Visit ${item.name} profile`"
          >
            <svg v-if="item.iconName === 'github'" width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            <svg v-else-if="item.iconName === 'linkedin'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"></path>
            </svg>
          </a>
        </div>
      </article>

      <aside class="panel about-side reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '220ms' }" aria-label="Focus areas">
        <span class="panel-halo" style="--panel-halo: var(--halo-violet)" aria-hidden="true"></span>
        <h3 class="side-title">Focus</h3>
        <ul class="side-list">
          <li v-for="(focus, fi) in focusAreas" :key="`focus-${fi}`" class="side-item">
            <span class="side-dot" aria-hidden="true"></span>
            {{ focus }}
          </li>
        </ul>
        <p class="side-note">
          {{ note }}
        </p>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const props = defineProps({
  bios: { type: Array, required: true },
  contacts: { type: Array, default: () => [] },
  focusAreas: { type: Array, default: () => [] },
  note: { type: String, default: '' },
})

const reveal = useScrollReveal({ rootMargin: '0px 0px -8% 0px' })

const socialItems = computed(() =>
  props.contacts
    .filter((c) => c.type === 'link')
    .map((c) => ({ ...c, iconName: c.name.toLowerCase() })),
)
</script>

<style scoped>
.about-section {
  scroll-margin-top: calc(var(--nav-height) + 1rem);
}

.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(0, 0.8fr);
  gap: 16px;
  margin-top: 1.1rem;
}

.about-panel,
.about-side {
  padding: var(--panel-pad);
}

.about-bio {
  margin: 0 0 0.85rem;
  color: var(--text-secondary);
  font-size: clamp(0.98rem, 1.7vw, 1.08rem);
  line-height: 1.78;
  text-wrap: pretty;
}

.about-bio:last-of-type {
  margin-bottom: 1.3rem;
}

/* ===== Socials ===== */

.about-socials {
  display: flex;
  gap: 0.6rem;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.26);
  background:
    radial-gradient(120% 130% at 18% -30%, rgba(255, 255, 255, 0.18), transparent 55%),
    linear-gradient(140deg, rgba(255, 255, 255, 0.09), transparent 60%),
    rgba(35, 35, 36, 0.2);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.26),
    0 6px 18px -8px rgba(2, 6, 26, 0.7);
  color: var(--text-secondary);
  transition:
    transform var(--transition-base),
    color var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);
}

.social-btn:hover {
  transform: translateY(-3px);
  color: var(--accent-cyan);
  border-color: rgba(255, 255, 255, 0.38);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 10px 24px -10px rgba(2, 6, 26, 0.85),
    0 0 20px rgba(125, 244, 232, 0.18);
}

.social-btn:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 2px;
}

/* ===== Side panel ===== */

.side-title {
  margin: 0 0 0.8rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--accent-violet);
}

.side-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.55rem;
}

.side-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.side-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, #fff, var(--accent-violet) 60%);
  box-shadow: 0 0 8px rgba(167, 155, 255, 0.6);
  flex-shrink: 0;
}

.side-note {
  margin: 1.1rem 0 0;
  padding-top: 1rem;
  border-top: 1px solid var(--border-l1);
  color: var(--text-tertiary);
  font-size: var(--text-sm);
  line-height: 1.65;
}

@media (max-width: 860px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>
