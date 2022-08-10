<template>
  <div>
    <h1>Upload Files</h1>
    <UploadFIlesWithProgressBar />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UploadFile from '@/components/Uploads/UploadFile.vue';
import UploadFIlesWithProgressBar from '@/components/UploadFIlesWithProgressBar/UploadFIlesWithProgressBar.vue';

@Options({
  components: {
    UploadFile,
    UploadFIlesWithProgressBar,
  },
})
export default class UploadsView extends Vue {}
</script>
