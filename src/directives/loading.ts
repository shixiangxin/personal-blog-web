import loadingImage from '@/assets/image/loading/loading.svg'
import style from '@/styles/directives.module.scss'
import { type ObjectDirective } from 'vue'
export const vLoading: ObjectDirective<HTMLElement> = {
  beforeMount(el, binding) {
    if (!binding.value) return
    if (window.getComputedStyle(el).position === 'static') {
      el.style.position = 'relative'
    }
    const image = new Image()

    image.src = loadingImage
    const container = document.createElement('div')
    container.className = style.loading!
    container.appendChild(image)
    el.appendChild(container)
  },
  beforeUpdate(el, binding) {
    const e = el.querySelector(`.${style.loading}`)
    if (binding.value === false && e !== null) {
      el.removeChild(e)
    }
  },
}
