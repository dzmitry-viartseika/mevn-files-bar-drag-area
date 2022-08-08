<template>
  <div>
    <Messages v-if="message" />
    <form @submit="onSubmit">
      <div class='custom-file mb-4'>
        <input
          type='file'
          class='custom-file-input'
          id='customFile'
          @change="onChange"
        />
        <label class='custom-file-label' htmlFor='customFile'>
          {{ filename }}
        </label>
      </div>

      <ProgressBar :percentage="uploadPercentage" />

      <input
        type="submit"
        value="Upload"
        class='btn btn-primary btn-block mt-4'
      />
    </form>
    <div className='row mt-5' v-if="uploadedFile.fileName && uploadedFile.filePath">
      <div className='col-md-6 m-auto'>
        <h3 className='text-center'>{{ uploadedFile.fileName }}</h3>
        <img :style="{'width': '100%'}" :src="uploadedFile.filePath" alt='' />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component';
import Messages from '@/components/Messages/Messages.vue';
import ProgressBar from "@/components/ProgressBar/ProgressBar.vue";
import axios from 'axios';

interface IFile {
  fileName: string,
  filePath: string,
}

@Options({
  components: {
    ProgressBar,
    Messages,
  }

})
export default class UploadFIleWithProgressBar extends Vue {
  message: string = '';
  filename: string = '';
  uploadPercentage: number = 0;
  file: any = '';
  uploadedFile: IFile = {} as IFile;

  onChange(e: any) {
    if (!e) return;
    this.file = e.target.files[0];
    this.filename = e.target.files[0].name;
  }

  async onSubmit(e: any) {
    e.peventDefault();
    const formData = new FormData();
    formData.append('file', this.file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          // this.uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
          this.uploadPercentage = 55;
        }
      });

      // Clear percentage
      setTimeout(() => this.uploadPercentage = 0, 10000);

      const { fileName, filePath } = res.data;

      this.uploadedFile = {
        fileName,
        filePath,
      };

      this.message = 'file uploaded'
    } catch (err: any) {
      if (err && err.response.status === 500) {
        this.message = 'There was a problem with the server';
      } else {
        this.message = err.response.data.msg;
      }
      this.uploadPercentage = 0;
    }
  }

}
</script>

<style scoped lang="scss"></style>
