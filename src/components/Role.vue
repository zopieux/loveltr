<template>
  <div :class="{wrap: true, columnar: props.layout === 'columnar'}">
    <svg viewBox="0 0 503 747" :class="[{ empty: props.currentCount === 0, [`number-${props.number}`]: true }]">
      <defs>
        <pattern patternUnits="userSpaceOnUse" :id="patId" x="0" y="0" width="300" height="300">
          <image width="108" height="149" :href="numBgUrl" transform="scale(1.3) translate(-10 20)" />
        </pattern>
        <text :id="numId" class="num" x="45" y="65" fill="white">{{ number }}</text>
        <g :id="repId">
          <image width="503" height="747" y="45" :href="bgUrl" />
          <image width="503" height="747" :href="cardUrl" />
          <text class="name" x="310" y="87" font-size="56">{{ $t(name) }}</text>
          <g transform="translate(43 12) rotate(0)" opacity="1">
            <text class="num stroked" x="45" y="65" fill="none">{{ number }}</text>
            <defs>
              <mask :id="maskId" x="0%" y="0%" width="100%" height="100%" maskUnits="objectBoundingBox">
                <use width="200" height="200" :xlink:href="`#${numId}`" />
              </mask>
            </defs>
            <g :mask="`url(#${maskId})`" opacity="1">
              <rect width="200" height="200" :fill="`url(#${patId})`" />
            </g>
          </g>
        </g>
      </defs>
      <use width="512" height="768" :xlink:href="`#${repId}`" />
    </svg>
    <div class="dots">
      <div :class="[{ dot: true, disabled: idx > props.currentCount }]" v-for="idx in props.count" :key="idx" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import cardUrl from '../assets/card/bg1.png'
import numBgUrl from '../assets/numbg.png'
import bullet from '../assets/bullet.gif'

import guard from '../assets/character/guard.png'
import spy from '../assets/character/spy.png'
import baron from '../assets/character/baron.png'
import princess from '../assets/character/princess.png'
import prince from '../assets/character/prince.png'
import priest from '../assets/character/priest.png'
import handmaid from '../assets/character/handmaid.png'
import countess from '../assets/character/countess.png'
import chancellor from '../assets/character/chancelor.png'
import king from '../assets/character/king.png'

const bulletUrl = `url(${bullet})`

const props = defineProps({
  name: String,
  number: Number,
  count: Number,
  currentCount: Number,
  layout: String,
})

const bgUrl = computed(() =>
  ({ guard, baron, king, spy, princess, prince, priest, handmaid, countess, chancellor }[props.name]))

const buildId = p => `_${p}_id_${props.name.toLowerCase()}`
  , maskId = buildId('mask')
  , patId = buildId('pat')
  , numId = buildId('num')
  , repId = buildId('rep')
</script>

<style scoped lang="sass">
@import '../common.sass'

.wrap
  position: relative
  display: block
  pointer-events: none

  .dots
    position: absolute
    vertical-align: top
    top: 16%
    left: 34%
    right: 9%
    padding-inline: 8%
    display: flex
    flex-wrap: wrap
    flex-direction: row
    justify-content: center
    $gap: 5px
    gap: $gap
    column-gap: $gap

    .dot
      background-image: v-bind(bulletUrl)
      background-size: cover
      box-shadow: 0 0 0 2px white
      width: calc(100% / 5)
      aspect-ratio: 1
      content: ''
      background-color: red
      border-radius: 100%

      &.disabled
        box-shadow: 0 0 0 2px #999
        filter: grayscale(1)

  &.columnar .dots
    top: 1%

    .dot
      width: calc(100% / 8)

svg
  pointer-events: none
  filter: grayscale(0)

  &.empty
    filter: grayscale(1)

  text
    user-select: none

  @each $num, $offset in (0: +5, 1: +7, 8: +15, 7: -5, 6: +22, 5: -3, 4: -0, 3: -8, 9: -5)
    &.number-#{$num} .num
      transform: translateY(#{$offset}px)

  .num
    font-family: 'Inknut Antiqua', serif
    font-weight: 700
    font-size: 89px
    text-anchor: middle
    dominant-baseline: central

    &.stroked
      text-shadow: 6px 6px 9px rgba(0, 0, 0, 0.7)
      stroke: #793d32
      stroke-width: 8px

  .name
    font-family: 'Pirata One', cursive
    text-anchor: middle
    fill: black
</style>