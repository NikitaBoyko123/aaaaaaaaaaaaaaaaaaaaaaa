
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const style = document.createElement('style')
style.textContent = `
  body {
    margin: 0;
    padding: 0;
    background-color: #0f0b18;
    min-height: 100vh;
  }
  
  #app {
    min-height: 100vh;
  }
`
document.head.appendChild(style)

createApp(App).use(router).mount('#app')