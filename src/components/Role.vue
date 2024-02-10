<template>
  <div class="wrap">
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
      <use width="512" height="768" v-for="idx in Math.max(1, props.currentCount)" :xlink:href="`#${repId}`" :key="idx"
        :x="`${xOff(idx)}`" :y="`${yOff(idx)}`" :transform="`scale(${scale(idx)})`" />
    </svg>
  </div>
</template>

<script setup>
import cardUrl from '../assets/card/bg1.png'
import numBgUrl from '../assets/numbg.png'

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
import { computed } from 'vue'

const props = defineProps({
  name: String,
  number: Number,
  count: Number,
  currentCount: Number,
})

const xOff = (idx) => props.currentCount > 1 ? (props.currentCount - idx) * 12 : 0
const yOff = (idx) => (idx - 1) * 22
const scale = (idx) => props.currentCount > 1 ? 1 - (props.currentCount - idx) * 0.05 : 1

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
  pointer-events: none

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