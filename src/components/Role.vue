<template>
  <div class="wrap">
    <svg viewBox="0 0 750 502" :class="[{ empty: props.currentCount === 0, [`number-${props.number}`]: true }]">
      <defs>
        <pattern patternUnits="userSpaceOnUse" :id="patId" x="0" y="0" width="300" height="300">
          <image width="108" height="149" :href="numBgUrl" transform="scale(1.3) translate(-10 20)" />
        </pattern>
        <text :id="numId" class="num" x="50" y="80" fill="white">{{ number }}</text>
      </defs>
      <image width="750" height="502" :href="cardUrl" />
      <text class="name" x="435" y="124" font-size="60">{{ $t(name) }}</text>
      <g transform="translate(93 43) rotate(0)" opacity="1">
        <text class="num stroked" x="50" y="80" fill="none">{{ number }}</text>
        <defs>
          <mask :id="maskId" x="0%" y="0%" width="100%" height="100%" maskUnits="objectBoundingBox">
            <use width="200" height="200" :xlink:href="`#${numId}`" />
          </mask>
        </defs>
        <g :mask="`url(#${maskId})`" opacity="1">
          <rect width="200" height="200" :fill="`url(#${patId})`" />
        </g>
      </g>
    </svg>
    <div class="dots">
      <div :class="[{ dot: true, disabled: (props.count - idx) >= props.currentCount }]" v-for="idx in props.count"
        :key="idx"></div>
    </div>
  </div>
</template>

<script setup>
import cardUrl from '../assets/card.png'
import numBgUrl from '../assets/numbg.png'
import bulletUrl from '../assets/bullet.gif'

const bulletImage = `url(${bulletUrl})`

const props = defineProps({
  name: String,
  number: Number,
  count: Number,
  currentCount: Number,
})

const buildId = p => `_${p}_id_${props.name.toLowerCase()}`
  , maskId = buildId('mask')
  , patId = buildId('pat')
  , numId = buildId('num')
</script>

<style scoped lang="sass">
@import '../common.sass'

.wrap
  position: relative
  pointer-events: none

  .dots
    $w: 17px
    position: absolute
    top: 8px
    left: 0
    right: 0
    width: 100%
    height: $w
    display: flex
    justify-content: center

    .dot
      width: $w
      height: $w
      margin-left: -4px
      border-radius: 100%
      background-image: v-bind(bulletImage)
      background-size: contain
      box-shadow: 0 0 0 2px white
      filter: grayscale(0)

      &.disabled
        box-shadow: 0 0 0 2px #999
        filter: grayscale(1)

svg
  pointer-events: none
  width: 100vw
  border-radius: $cardRadius $cardRadius 0 0
  filter: grayscale(0)

  &.empty
    filter: grayscale(1)

  text
    user-select: none

  @each $num, $offset in (8: +22, 7: -10, 6: +22, 5: -12, 4: -12, 3: -15)
    &.number-#{$num} .num
      transform: translateY(#{$offset}px)

  .num
    font-family: 'Inknut Antiqua', serif
    font-weight: 700
    font-size: 140px
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