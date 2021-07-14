// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ComponentCustomProperties } from '@/vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
  // interface State {
  // 	name: string
  // }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<Record<string, any>>
  }
}
