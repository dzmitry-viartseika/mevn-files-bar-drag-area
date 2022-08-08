<template>
<!--  <upload-file />-->
  <UploadFIleWithProgressBar />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UploadFile from '@/components/Uploads/UploadFile.vue';
import UploadFIleWithProgressBar from '@/components/UploadFIleWithProgressBar/UploadFIleWithProgressBar.vue';

@Options({
  components: {
    UploadFile,
    UploadFIleWithProgressBar,
  },

  // components: {
  //   HelloWorld,
  // },
})
export default class HomeView extends Vue {}
</script>
