<script setup>
import { onBeforeUnmount, onMounted, shallowRef, useTemplateRef } from 'vue'
import { gas, gasTier } from '@/effects/gas/index.js'

// Off under reduced motion; dropped later if WebGL2 or half-float targets are missing.
const enabled = shallowRef(gasTier() !== null)
const canvas = useTemplateRef('canvas')
let idleHandle = 0

function start() {
  idleHandle = 0
  gas.mount(canvas.value).then((ok) => {
    if (!ok) enabled.value = false
  })
}

onMounted(() => {
  if (!enabled.value) return
  // after first paint: the engine is a separate chunk and never delays the page
  idleHandle = window.requestIdleCallback
    ? window.requestIdleCallback(start, { timeout: 1200 })
    : window.setTimeout(start, 300)
})

onBeforeUnmount(() => {
  if (idleHandle) (window.cancelIdleCallback ?? window.clearTimeout)(idleHandle)
  gas.unmount()
})
</script>

<template>
  <canvas v-if="enabled" ref="canvas" class="gas" aria-hidden="true"></canvas>
</template>

<style scoped>
/* Between the sky and the page: vapour drifts behind the glass and shows
   through it. While the case dialog is open the layer is raised above the
   scrim, below the dialog (gas.raise). */
.gas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-gas);
  pointer-events: none;
}

.gas[data-raised] {
  z-index: var(--z-gas-raised);
}

@media print {
  .gas {
    display: none;
  }
}
</style>
