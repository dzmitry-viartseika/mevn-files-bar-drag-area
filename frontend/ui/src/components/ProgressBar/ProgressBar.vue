<template>
  <div class="app-progress">
    <div
      class="app-progress-bar app-progress-bar-striped bg_success"
      role="progressbar"
      :style="{'width': `${percentage}%`}">
      {{ percentage }}%
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component';

@Options({
  props: {
    percentage: Number,
  },
})
export default class ProgressBar extends Vue {
  percentage!: number;
}
</script>

<style scoped lang="scss">
  .app-progress-bar {
    background: red;
  }
</style>
