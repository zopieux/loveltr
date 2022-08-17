<template>
  <div v-bind:class="[{'flip-container': true, 'flipped': flipped}]">
    <div class="flipper">
      <div class="front">
        <slot name="front"></slot>
      </div>
      <div class="back">
        <slot name="back"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  flipped: Boolean,
  duration: {default: '0.6s', type: String},
})
</script>

<style lang="css" scoped>
.flip-container {
  perspective: 1000px;
}

.flipper {
  position: relative;
}

.front,
.back {
  backface-visibility: hidden;
  transition: transform;
  transform-style: preserve-3d;
  transition-duration: v-bind('props.duration');
  top: 0;
  left: 0;
  width: 100%;
}

.back {
  transform: rotateY(-180deg);
  position: absolute;
}

.flip-container.flipped .back {
  transform: rotateY(0deg);
}

.flip-container.flipped .front {
  transform: rotateY(180deg);
}

.front {
  z-index: 2;
}
</style>