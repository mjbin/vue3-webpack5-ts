import { createApp } from './main'

const { app, store, router } = createApp()

const storeInitialState = window.INITIAL_DATA

if (storeInitialState) {
  store.replaceState(storeInitialState)
}

router.isReady().then(() => {
  app.mount('#app')
})
