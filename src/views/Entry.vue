<template>
  <p @click="to404">entry view</p>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
  // import { useRouter } from 'vue-router'

  // const router = useRouter()

  // const to404 = () => {
  //   router.push('/404')
  // }
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    setup() {
      const router = useRouter()

      const to404 = () => {
        router.push('/404')
      }

      return {
        to404
      }
    }
  })
</script>
