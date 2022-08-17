<template>
  <FlipCard v-bind:flipped="flipped" duration="0.4s">
    <template v-slot:front>
      <section>
        <Cards :roles="sortedRolesProbability"
               @increase="(number) => changeRoleCount(number, +1)"
               @decrease="(number) => changeRoleCount(number, -1)"/>
        <IconSettings class="icon settings" @click="flip"/>
        <IconReset class="icon reset" @click="reset"/>
      </section>
    </template>
    <template v-slot:back>
      <section>
        <IconSettings class="icon settings" @click="flip"/>
        <h4>Settings</h4>
        <Config :roles="roles"
                @increase="(number) => changeRoleSetting(number, +1)"
                @decrease="(number) => changeRoleSetting(number, -1)"/>
      </section>
    </template>
  </FlipCard>
</template>

<script setup>
import {ref, computed} from 'vue'

import FlipCard from './components/FlipCard.vue'
import Config from './components/Config.vue'
import Cards from './components/Cards.vue'
import IconSettings from './components/IconSettings.vue';
import IconReset from './components/IconReset.vue';

function sorted(arr, f, sign) {
  const c = [...arr]
  c.sort((a, b) => f(a) < f(b) ? -sign : sign)
  return c
}

const pad = e => `${e}`.padStart(4, '0')
const rank = role => `${pad(role.currentCount)},${pad(role.number)}`

const role = (name, number, count) => ({name, number, count, currentCount: count})
    , roleInit = [
  role('Princess', 8, 1),
  role('Countess', 7, 1),
  role('King', 6, 1),
  role('Prince', 5, 2),
  role('Handmaid', 4, 2),
  role('Baron', 3, 2),
  role('Priest', 2, 2),
  role('Guard', 1, 6),
  role('Spy', 0, 2),
]
    , numberToRoleIdx = Object.fromEntries(roleInit.map((r, i) => [r.number, i]))

const roles = ref(roleInit)
    , flipped = ref(false)
    , sortedRolesProbability = computed(() => sorted(roles.value, rank, -1))

function flip() {
  flipped.value = !flipped.value
}

function reset() {
  roles.value = roles.value.map(role => ({...role, currentCount: role.count}))
}

function changeRoleCount(number, sign) {
  const idx = numberToRoleIdx[number], current = roles.value[idx].currentCount, updated = current + sign
  if (0 <= updated && updated <= roles.value[idx].count) {
    roles.value[idx].currentCount = updated
  }
}

function changeRoleSetting(number, sign) {
  const idx = numberToRoleIdx[number]
  roles.value[idx].count += sign
}
</script>

<style scoped lang="sass">
section
  display: flex
  align-items: center
  flex-direction: column
  gap: 1rem

h4
  font-size: 2rem
  font-weight: normal
  margin: 0
  padding: 0
  padding-block-start: .5rem

$w: 45px
.icon
  width: $w
  height: $w
  z-index: 10
  position: absolute
  right: 10px

  &.settings
    top: 10px

  &.reset
    top: $w + 18px
</style>
