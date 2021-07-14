import { createApp as _createApp } from './main'

export default async function createApp(url: string) {
  const { app, router, store } = _createApp()

  router.push(url)
  await router.isReady()

  const matchedComponents = router.currentRoute.value.matched
  // no matched routes, reject with 404
  if (!matchedComponents.length) {
    router.push('/404')
  }

  // the Promise should resolve to the app instance so it can be rendered
  return { app, router, store }
}
