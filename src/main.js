import Vue from 'vue'
import App from './App'
import './assets/styles/style.css'

Vue.config.productionTip = false

const requireComponent = require.context(
  './components/ui',
  false,
  /Base[A-Z]\w+\.(vue)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')

  Vue.component(componentName, componentConfig.default || componentConfig)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
