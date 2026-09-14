<template>
  <Teleport to="body">
    <Transition name="case">
      <div v-if="project" class="case-scrim" @click.self="emit('close')">
        <div
          ref="dialogEl"
          class="glass case-dialog"
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
              ref="closeEl"
              type="button"
              class="case-close"
              :aria-label="t('projects.close')"
              @click="emit('close')"
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

<script setup>
import { nextTick, onBeforeUnmount, useTemplateRef, watch } from 'vue'
import ProjectDetails from '@/components/ProjectDetails.vue'
import StatusBadge from '@/components/StatusBadge.vue'
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
const closeEl = useTemplateRef('closeEl')
const titleId = 'case-dialog-title'

// 打开期间锁滚动；关闭后把焦点还给触发按钮
function returnFocus() {
  const target = props.trigger || null
  if (target && typeof target.focus === 'function') target.focus()
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    e.stopPropagation()
    emit('close')
  }
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

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  if (document.body.dataset.prevOverflow !== undefined) {
    document.body.style.overflow = document.body.dataset.prevOverflow || ''
    delete document.body.dataset.prevOverflow
  }
})
</script>

<style scoped>
/* 遮罩：纯色半透明（自身不加模糊——整屏实时采样在 Retina 下代价高，
   模糊交给窗口自身，观感相同） */
.case-scrim {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: grid;
  place-items: center;
  padding: clamp(1rem, 4vw, 2.5rem);
  background: rgba(3, 5, 12, 0.74);
  overflow-y: auto;
}

/* 悬浮窗：厚高斯模糊玻璃 + 更大的面板。
   全站唯一使用 backdrop-filter 的地方：只在窗口打开时存在、
   面积可控，且打开时页面已锁滚动。 */
.case-dialog {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 880px;
  max-height: 88vh;
  padding: 0;
  overflow: hidden;
  background:
    linear-gradient(
      155deg,
      rgba(255, 255, 255, 0.16) 0%,
      rgba(255, 255, 255, 0.05) 45%,
      rgba(90, 150, 255, 0.14) 100%
    ),
    rgba(8, 12, 26, 0.42);
  backdrop-filter: blur(34px) saturate(1.5) brightness(1.06);
  -webkit-backdrop-filter: blur(34px) saturate(1.5) brightness(1.06);
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.38),
    var(--glass-iris),
    0 30px 80px -24px rgba(2, 6, 26, 0.95);
}

/* 窗口不做任何鼠标悬停交互（覆盖 .glass:hover 的上浮与变色） */
.case-dialog:hover {
  transform: none;
  border-color: rgba(255, 255, 255, 0.22);
  background:
    linear-gradient(
      155deg,
      rgba(255, 255, 255, 0.16) 0%,
      rgba(255, 255, 255, 0.05) 45%,
      rgba(90, 150, 255, 0.14) 100%
    ),
    rgba(8, 12, 26, 0.42);
}

.case-dialog:focus {
  outline: none;
}

/* ===== 头部 ===== */

.case-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: clamp(1.4rem, 3vw, 2rem) clamp(1.4rem, 3vw, 2.4rem) 1.1rem;
  border-bottom: 1px solid var(--border-l1);
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

.case-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  cursor: pointer;
  transition:
    color var(--transition-base),
    border-color var(--transition-base),
    background var(--transition-base);
}

.case-close:hover {
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.34);
  background: rgba(255, 255, 255, 0.09);
}

/* ===== 内容区（内部滚动） ===== */

.case-content {
  padding: 0 clamp(1.4rem, 3vw, 2.4rem) clamp(1.5rem, 3vw, 2.1rem);
  overflow-y: auto;
  overscroll-behavior: contain;
}

/* ===== 开合过渡：仅 opacity + transform ===== */

.case-enter-active,
.case-leave-active {
  transition: opacity 200ms var(--ease-aero);
}

.case-enter-active .case-dialog,
.case-leave-active .case-dialog {
  transition: transform 220ms var(--ease-aero);
}

.case-enter-from,
.case-leave-to {
  opacity: 0;
}

.case-enter-from .case-dialog,
.case-leave-to .case-dialog {
  transform: translateY(12px) scale(0.985);
}

@media (prefers-reduced-motion: reduce) {
  .case-enter-active,
  .case-leave-active,
  .case-enter-active .case-dialog,
  .case-leave-active .case-dialog {
    transition: none;
  }
}

@media (max-width: 560px) {
  .case-scrim {
    padding: 0.9rem;
  }

  .case-dialog {
    max-height: 88vh;
  }
}
</style>
