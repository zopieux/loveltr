<template>
  <template v-if="!showSettings">
    <section>
      <Cards :roles="sortedRolesProbability" @increase="(number) => changeRoleCount(number, +1)"
        @decrease="(number) => changeRoleCount(number, -1)" />
      <IconSettings class="icon settings" @click="toggleSettings" />
      <IconReset class="icon reset" @click="reset" />
    </section>
  </template>
  <template v-if="showSettings">
    <section>
      <IconSettings class="icon settings" @click="toggleSettings" />
      <h4>{{ $t('settings') }}</h4>
      <Config :roles="roles" @increase="(number) => changeRoleSetting(number, +1)"
        @decrease="(number) => changeRoleSetting(number, -1)" @resetDefaults="resetSettings" />
    </section>
  </template>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'

import Config from './components/Config.vue'
import Cards from './components/Cards.vue'
import IconSettings from './components/IconSettings.vue'
import IconReset from './components/IconReset.vue'

function sorted(arr, f, sign) {
  const c = [...arr]
  c.sort((a, b) => f(a) < f(b) ? -sign : sign)
  return c
}

const pad = e => `${e}`.padStart(4, '0')
const rank = role => `${pad(role.currentCount)},${pad(role.number)}`

const saneLanguageDeepCopy = (e) => JSON.parse(JSON.stringify(e))

const role = (name, number, count) => ({ name, number, count, currentCount: count })
  , roleInit = [
    role('princess', 9, 1),
    role('countess', 8, 1),
    role('king', 7, 1),
    role('chancellor', 6, 2),
    role('prince', 5, 2),
    role('handmaid', 4, 2),
    role('baron', 3, 2),
    role('priest', 2, 2),
    role('guard', 1, 6),
    role('spy', 0, 2),
  ]
  , roleInitDefault = saneLanguageDeepCopy(roleInit)
  , numberToRoleIdx = Object.fromEntries(roleInit.map((r, i) => [r.number, i]))

const settings = useStorage('settings',
  { locale: 'en', roles: roleInitDefault, },
  localStorage, { mergeDefaults: true })

const { locale } = useI18n()
locale.value = settings.value.locale
watch(locale, () => settings.value.locale = locale)

const roles = ref(roleInit)
  , showSettings = ref(false)
  , sortedRolesProbability = computed(() => sorted(roles.value.filter(role => role.count > 0), rank, -1))

roles.value = settings.value.roles

function toggleSettings() {
  showSettings.value = !showSettings.value
}

function reset() {
  roles.value = roles.value.map(role => ({ ...role, currentCount: role.count }))
  settings.value.roles = roles.value
}

function changeRoleCount(number, sign) {
  const idx = numberToRoleIdx[number], current = roles.value[idx].currentCount, updated = current + sign
  if (0 <= updated && updated <= roles.value[idx].count) {
    roles.value[idx].currentCount = updated
  }
  settings.value.roles = roles.value
}

function changeRoleSetting(number, sign) {
  const idx = numberToRoleIdx[number]
  roles.value[idx].count += sign
  roles.value[idx].currentCount = Math.min(roles.value[idx].count, roles.value[idx].currentCount)
  settings.value.roles = roles.value
}

function resetSettings() {
  roles.value = saneLanguageDeepCopy(roleInitDefault)
  settings.value.roles = roles.value
}
</script>

<style scoped lang="sass">
section
  display: flex
  align-items: center
  flex-direction: column
  gap: 0.7rem

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
