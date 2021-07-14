<template>
  <p>app view</p>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style lang="less">
  @import '~normalize.css/normalize.css';
</style>
