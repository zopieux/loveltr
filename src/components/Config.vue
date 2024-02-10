<template>
  <section>
    <aside>
      <header>
        <IconSettings class="icon" @click="$emit('close')" />
        <h4>{{ $t('settings') }}</h4>
      </header>
      <div class="row">
        <select v-model="$i18n.locale">
          <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{
            locale.toUpperCase()
          }}</option>
        </select>
        <select v-model="layout">
          <option v-for="kind in ['grid', 'columnar']" :key="kind" :value="kind">{{ $t(kind) }}</option>
        </select>
        <button @click="$emit('resetDefaults')">{{ $t("defaults") }}</button>
      </div>
    </aside>
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
  </section>
</template>

<script setup>
import IconSettings from './IconSettings.vue'
defineProps({
  roles: Array,
})
const layout = defineModel('layout', { default: 'grid' })
defineEmits(['decrease', 'increase', 'resetDefaults', 'close'])
</script>

<style scoped lang="sass">
@import '../common.sass'

$gap: 0.8rem

section
  $top: 1rem
  display: flex
  flex-direction: column
  align-items: center
  gap: $gap
  padding-block: $top

  // @media screen and (orientation: portrait)

  @media screen and (orientation: landscape)
    flex-direction: row
    align-items: flex-start
    justify-content: center

    aside
      position: sticky
      top: $top

header
  display: flex
  flex-direction: row
  align-items: center
  gap: 5px

  h4
    font-size: 1.6rem
    font-weight: normal
    margin: 0
    padding: 0
    line-height: 1

aside
  display: flex
  align-items: center
  flex-direction: column
  gap: $gap
  .row
    display: flex
    flex-direction: row
    justify-content: center
    gap: $gap

select, button
  font: inherit

main
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