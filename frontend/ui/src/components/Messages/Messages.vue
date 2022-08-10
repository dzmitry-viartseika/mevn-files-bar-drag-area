<template>
  <div class="alert alert-info alert-dismissible fade show" role='alert'>
    {{ msg }}
    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
      @click="clickEvent"
    >
      <span aria-hidden='true'>&times;</span>
    </button>
  </div>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component';

@Options({
  props: {
    msg: String,
  },
})
export default class Messages extends Vue {
  msg!: string;


  clickEvent() {
    this.$emit('clickEvent', '');
  }
}
</script>

<style scoped lang="scss"></style>
