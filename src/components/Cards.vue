<template>
  <div id="cards" :class="{ cEight: roles.length <= 8, cTen: roles.length >= 10 }">
    <div v-for="(role, i) in roles" :key="i" :data-num="role.number"
      v-touch="(e) => $emit('decrease', e.target.dataset.num)"
      v-touch:hold="(e) => $emit('increase', e.target.dataset.num)">
      <Role v-bind="role" />
      <div class="shadow" />
    </div>
  </div>
</template>

<script setup>
import Role from './Role.vue'

const props = defineProps({ roles: Array })
const emit = defineEmits(['decrease', 'increase'])
</script>

<style scoped lang="sass">
@import '../common.sass'

#cards
  $gap: 5px
  gap: $gap
  padding-block: calc($gap * 2)
  // padding-inline: calc($gap * 2)
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
      flex: 0 0 calc(100% / 2 - 2px - $gap)
      aspect-ratio: 2/1

    @media screen and (orientation:landscape)
      aspect-ratio: 2/1
      flex: 0 0 calc(100% / 4 - 2px - $gap)

  &.cTen > div
    @media screen and (orientation:landscape)
      flex: 0 0 calc(100% / 5 - 2px - $gap)
</style>