<script setup>
import { useI18n } from '@/i18n/index.js'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer mono">
    <p>© {{ year }} Harry Zhu · {{ t('footer.built') }}</p>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: 48px 64px;
  border-top: 1px solid var(--line);
}
</style>
