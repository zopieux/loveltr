<template>
  <div id="cards" :class="{ columnar: layout === 'columnar', cEight: roles.length <= 8, cTen: roles.length >= 10 }">
    <div v-for="(role, i) in roles" :key="i" :data-num="role.number"
      v-touch="(e) => $emit('decrease', e.target.dataset.num)"
      v-touch:hold="(e) => $emit('increase', e.target.dataset.num)">
      <Role v-bind="role" :layout="layout" />
      <div class="shadow" />
    </div>
  </div>
</template>

<script setup>
import Role from './Role.vue'

defineProps({ roles: Array, layout: String })
defineEmits(['decrease', 'increase'])
</script>

<style scoped lang="sass">
@import '../common.sass'

#cards
  $gap: 5px
  gap: $gap
  padding-block: $gap
  display: flex
  width: 100vw
  height: 100vh
  max-height: 100vh
  position: fixed
  flex-wrap: wrap
  justify-content: center

  > div
    position: relative
    overflow: hidden

    > .shadow
      pointer-events: none
      position: absolute
      top: 0
      bottom: 0
      width: 100%
      background-image: linear-gradient(transparentize($bg, 1.0) 0%, transparentize($bg, 1.0) 80%, $bg 98%, $bg 100%)

    @media screen and (orientation:portrait)
      flex: 0 0 calc(100% / 2 - $gap)
      aspect-ratio: 2/1

    @media screen and (orientation:landscape)
      flex: 0 0 calc(100% / 4 - $gap)
      aspect-ratio: 2/1

  &.columnar > div
    @media screen and (orientation:portrait)
      flex: 0 0 calc(100% / 1 - $gap)
      aspect-ratio: 6/1

  &.cTen > div
    @media screen and (orientation:landscape)
      flex: 0 0 calc(100% / 5 - 2px - $gap)
</style>