<template>
  <div id="cards">
    <div v-for="(role, i) in roles"
         :key="i"
         :data-num="role.number"
         v-touch="(e) => $emit('decrease', e.target.dataset.num)"
         v-touch:hold="(e) => $emit('increase', e.target.dataset.num)"
    >
      <div class="shadow" :style="{height: `calc(1rem + ${roleLen - i} * (100vh / ${roleLen} - 1rem / ${roleLen}))`}"/>
      <Role v-bind="role"/>
    </div>
  </div>
</template>

<script setup>
import Role from './Role.vue'

const props = defineProps({roles: Array})
const emit = defineEmits(['decrease', 'increase'])

const roleLen = props.roles.length;
</script>

<style scoped lang="sass">
@import '../common.sass'

#cards
  display: grid
  width: 100vw
  height: 100vh
  max-height: 100vh
  position: fixed
  overflow: hidden

  > div
    min-height: 0
    overflow: visible

    > .shadow
      pointer-events: none
      width: 100%
      position: absolute
      box-shadow: 0 0 7px 1px black
      border-radius: $cardRadius $cardRadius 0 0
</style>