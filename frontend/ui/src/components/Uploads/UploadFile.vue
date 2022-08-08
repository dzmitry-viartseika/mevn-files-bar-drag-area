<template>
  <div class="app-input">
    <input type="file" label="file" hidden id="fileUpload" aria-label="file">
    <button @click="uploadFile">
      Upload File
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  // props: {
  //   msg: String,
  // },
})
export default class UploadFile extends Vue {
  // msg!: string

  uploadFile() {
    const fileUpload = document.getElementById('fileUpload');
    if (fileUpload) {
      fileUpload.click();
    }
  }
}
</script>

<style scoped lang="scss">
  .app-input {
    color: red;
  }
</style>
