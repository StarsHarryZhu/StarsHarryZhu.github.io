import { shallowRef, onBeforeUnmount } from 'vue'

export function useCopyToast() {
  const isModalOpen = shallowRef(false)
  const modalText = shallowRef('')
  let modalTimer = null

  function clearTimer() {
    if (modalTimer !== null) {
      clearTimeout(modalTimer)
      modalTimer = null
    }
  }

  function showToast(text, duration = 800) {
    modalText.value = text
    isModalOpen.value = true
    clearTimer()
    modalTimer = setTimeout(() => {
      isModalOpen.value = false
      modalTimer = null
    }, duration)
  }

  async function copyText(value, successText = 'Copied to clipboard.') {
    if (!value) return
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = value
        textArea.setAttribute('readonly', '')
        textArea.style.position = 'absolute'
        textArea.style.left = '-9999px'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      showToast(successText)
    } catch {
      showToast('Unable to copy.')
    }
  }

  onBeforeUnmount(() => {
    clearTimer()
  })

  return { isModalOpen, modalText, copyText }
}
