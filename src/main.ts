import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/global.scss'
import './mock'
import App from './App.vue'
import router from './router'
import { vLoading } from './directives/loading.ts'
import { vToTop } from './directives/toTop.ts'
import { vLazy } from './directives/lazy.ts'
const app = createApp(App)
app.directive('loading', vLoading)
app.directive('to-top', vToTop)
app.directive('lazy', vLazy)
app.use(createPinia())
app.use(router)

app.mount('#app')
