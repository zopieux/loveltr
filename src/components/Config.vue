<template>
  <div class="top">
    <select class="lang" v-model="$i18n.locale">
      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale.toUpperCase() }}</option>
    </select>
    <button @click="$emit('resetDefaults')">{{ $t("defaults") }}</button>
  </div>
  <main>
    <template v-for="role in roles" :key="role.number">
      <div class="name">
        <sup v-text="role.number"></sup>
        <span v-text="$t(role.name)" />
      </div>
      <button @click="$emit('decrease', role.number)" :disabled="role.count === 0">-</button>
      <span v-text="role.count" style="text-align: center" />
      <button @click="$emit('increase', role.number)">+</button>
    </template>
  </main>
</template>

<script setup>
defineProps({
  roles: Array,
})
defineEmits(['decrease', 'increase', 'resetDefaults'])
</script>

<style scoped lang="sass">
@import '../common.sass'

div.top
  display: flex
  flex-direction: row
  gap: 1rem

select.lang, button
  font: inherit

main
  width: 100%
  padding-inline: 1rem
  column-gap: 1rem
  row-gap: .5rem
  display: grid
  grid-template-columns: 1fr auto 6vw auto

  button
    display: flex
    justify-content: center
    outline: none
    background: $accent
    width: 1.5rem
    height: 1.5rem
    border-radius: 50%
    border: none
    font: inherit
    font-size: 1.5rem
    color: inherit
    line-height: 90%

    &:disabled
      filter: grayscale(1)

.name
  sup
    font-family: 'Inknut Antiqua', serif
    font-size: 0.6rem
    line-height: 1rem
    color: $accent
    text-shadow: 1px 1px 0 darken($accent, 25)
    position: relative
    left: -4px
</style>