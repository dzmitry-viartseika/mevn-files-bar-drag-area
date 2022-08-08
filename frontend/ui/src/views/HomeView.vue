<template>
  <upload-file />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UploadFile from '@/components/Uploads/UploadFile.vue';

@Options({
  components: {
    UploadFile,
  },

  // components: {
  //   HelloWorld,
  // },
})
export default class HomeView extends Vue {}
</script>
