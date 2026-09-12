import loadingImage from '@/assets/image/loading/loading.svg'
import style from '@/styles/directives.module.scss'
import { type ObjectDirective } from 'vue'
export const vLoading: ObjectDirective<HTMLElement> = {
  beforeMount(el, binding) {
    if (!binding.value) return
    const elStyle = window.getComputedStyle(el)
    if (elStyle.position === '' || elStyle.position === 'static') {
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
    const e = el.querySelector<HTMLElement>(`.${style.loading}`)
    if (!e) return
    e.style.display = binding.value ? 'flex' : 'none'
  },
}
