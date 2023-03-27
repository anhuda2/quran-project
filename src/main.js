import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Import Quranic verse components
import QuranLayout from '@/components/QuranLayout.vue'
import QuranicVerse from '@/components/QuranicVerse.vue'
import RealTimeReading from '@/components/RealTimeReading.vue'
import Bookmark from '@/components/Bookmark.vue'

Vue.config.productionTip = false

// Register Quranic verse components globally
Vue.component('quran-layout', QuranLayout)
Vue.component('quranic-verse', QuranicVerse)
Vue.component('realtime-reading', RealTimeReading)
Vue.component('bookmark', Bookmark)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')