<script setup>
import { nextTick, onBeforeUnmount, useTemplateRef, watch } from 'vue'
import ProjectDetails from '@/components/sections/ProjectDetails.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { gas } from '@/effects/gas/index.js'
import { attachLens } from '@/effects/lens/index.js'
import { useI18n } from '@/i18n/index.js'

const props = defineProps({
  /** 当前打开的项目；null 表示关闭 */
  project: { type: Object, default: null },
  /** 触发按钮：关闭后把焦点还给它是无障碍要求 */
  trigger: { type: HTMLElement, default: null },
})

const emit = defineEmits(['close'])

const { t, pick } = useI18n()

const dialogEl = useTemplateRef('dialogEl')
const titleId = 'case-dialog-title'
// under reduced motion the dialog appears and leaves at once
const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : { enter: 460, leave: 520 }

// 气态动效：窗口沿关闭操作的方向化烟散开
// （关闭按钮 → 右上；Esc → 向上；点遮罩 → 从点击处推开）
let exitDir = [0, -1]
let detachLens = () => {}

function requestClose(dir) {
  exitDir = dir
  emit('close')
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    e.stopPropagation()
    requestClose([0, -1])
  }
}

function onLayerClick(e) {
  const r = dialogEl.value?.getBoundingClientRect()
  if (!r) return requestClose([0, -1])
  requestClose([r.left + r.width / 2 - e.clientX, r.top + r.height / 2 - e.clientY])
}

// 打开期间锁滚动；关闭后把焦点还给触发按钮
function returnFocus() {
  const target = props.trigger || null
  if (target && typeof target.focus === 'function') target.focus()
}

function open() {
  document.addEventListener('keydown', onKeydown)
  const prevOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  document.body.dataset.prevOverflow = prevOverflow
  nextTick(() => dialogEl.value?.focus())
}

function close() {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = document.body.dataset.prevOverflow || ''
  delete document.body.dataset.prevOverflow
  returnFocus()
}

watch(
  () => props.project,
  (next) => (next ? open() : close()),
)

// ===== Transition hooks (el is the layer; the ref may already be cleared on leave) =====

function onEnter(el) {
  const dialog = el.querySelector('.case-dialog')
  gas.raise(true)
  detachLens = attachLens(dialog, { id: 'lens-case', bezel: 26, scale: 44 })
  gas.puff(dialog.getBoundingClientRect(), { mode: 'condense', strength: 1.2 })
}

function onBeforeLeave(el) {
  const dialog = el.querySelector('.case-dialog')
  const len = Math.hypot(exitDir[0], exitDir[1]) || 1
  dialog.style.setProperty('--exit-x', (exitDir[0] / len).toFixed(3))
  dialog.style.setProperty('--exit-y', (exitDir[1] / len).toFixed(3))
  gas.puff(dialog.getBoundingClientRect(), { mode: 'disperse', dir: exitDir })
  exitDir = [0, -1]
}

function onAfterLeave() {
  detachLens()
  gas.raise(false)
}

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  detachLens()
  if (document.body.dataset.prevOverflow !== undefined) {
    document.body.style.overflow = document.body.dataset.prevOverflow || ''
    delete document.body.dataset.prevOverflow
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="scrim">
      <div v-if="project" class="case-scrim" aria-hidden="true"></div>
    </Transition>

    <Transition
      name="case"
      :duration="duration"
      @enter="onEnter"
      @before-leave="onBeforeLeave"
      @after-leave="onAfterLeave"
    >
      <div v-if="project" class="case-layer" @click.self="onLayerClick">
        <div
          ref="dialogEl"
          class="lens-glass case-dialog"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          tabindex="-1"
        >
          <header class="case-head">
            <div class="case-head-main">
              <h3 :id="titleId" class="case-title">{{ project.name }}</h3>
              <div class="case-meta">
                <StatusBadge :status="project.status" />
                <span v-if="project.period" class="case-period">{{ pick(project.period) }}</span>
              </div>
            </div>

            <button
              type="button"
              class="case-close"
              :aria-label="t('projects.close')"
              @click="requestClose([0.7, -1])"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18"></path>
              </svg>
            </button>
          </header>

          <div class="case-content">
            <ProjectDetails :project="project" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Three stacked layers while open: the scrim (z-scrim), the gas layer
   raised above it (z-gas-raised, see GasLayer), and the dialog (z-modal).
   Vapour from opening and closing therefore drifts over the dimmed page
   and under the glass. */

.case-scrim {
  position: fixed;
  inset: 0;
  z-index: var(--z-scrim);
  background: rgba(3, 5, 12, 0.72);
}

.case-layer {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: grid;
  place-items: center;
  padding: clamp(1rem, 4vw, 2.5rem);
  overflow-y: auto;
}

/* Thick lens glass: the second and last surface that samples its backdrop.
   It exists only while open, and the page behind is locked. No hover
   effect of any kind on the dialog itself. */
.case-dialog {
  --lens-blur: 34px;
  --glass-radius: 28px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 880px;
  max-height: 88vh;
  overflow: hidden;
  background:
    var(--glass-specular),
    linear-gradient(
      158deg,
      rgba(255, 255, 255, 0.14) 0%,
      rgba(255, 255, 255, 0.04) 45%,
      rgba(91, 124, 255, 0.12) 100%
    ),
    rgba(8, 11, 26, 0.48);
}

.case-dialog:focus {
  outline: none;
}

/* ===== Head ===== */

.case-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: clamp(1.4rem, 3vw, 2rem) clamp(1.4rem, 3vw, 2.4rem) 1.1rem;
  border-bottom: 1px solid var(--line-1);
}

.case-head-main {
  display: grid;
  gap: 0.45rem;
  min-width: 0;
}

.case-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 3vw, 1.55rem);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
}

.case-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.case-period {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  letter-spacing: var(--tracking-wide);
  color: var(--text-tertiary);
  white-space: nowrap;
}

/* a round glass droplet */
.case-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background:
    radial-gradient(120% 120% at 30% 0%, rgba(255, 255, 255, 0.2), transparent 60%),
    rgba(255, 255, 255, 0.04);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -6px 10px -8px rgba(148, 104, 255, 0.8);
  color: var(--text-secondary);
  cursor: pointer;
  transition:
    color var(--transition-base),
    border-color var(--transition-base);
}

.case-close:hover {
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.38);
}

/* ===== Body (scrolls inside the dialog) ===== */

.case-content {
  padding: 0 clamp(1.4rem, 3vw, 2.4rem) clamp(1.5rem, 3vw, 2.1rem);
  overflow-y: auto;
  overscroll-behavior: contain;
}

/* ===== Open: condense out of vapour. Close: evaporate along the gesture.
   Opacity, transform and a one-shot blur only. ===== */

.scrim-enter-active,
.scrim-leave-active {
  transition: opacity 280ms var(--ease-aero);
}

.scrim-enter-from,
.scrim-leave-to {
  opacity: 0;
}

.case-enter-active .case-dialog {
  transition:
    opacity 380ms var(--ease-vapor),
    transform 460ms var(--ease-vapor),
    filter 420ms var(--ease-vapor);
}

.case-leave-active .case-dialog {
  transition:
    opacity 420ms var(--ease-aero),
    transform 520ms var(--ease-aero),
    filter 420ms var(--ease-aero);
}

.case-enter-from .case-dialog {
  opacity: 0;
  transform: translateY(12px) scale(0.965);
  filter: blur(14px);
}

.case-leave-to .case-dialog {
  opacity: 0;
  transform:
    translate(calc(var(--exit-x, 0) * 34px), calc(var(--exit-y, -1) * 34px))
    scale(1.02);
  filter: blur(12px);
}

@media (prefers-reduced-motion: reduce) {
  .scrim-enter-active,
  .scrim-leave-active,
  .case-enter-active .case-dialog,
  .case-leave-active .case-dialog {
    transition: none;
  }
}

@media (max-width: 560px) {
  .case-layer {
    padding: 0.9rem;
  }
}
</style>
