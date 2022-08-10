<template>
  <div>
    <Messages
      v-if="message"
      :msg="message"
      @clickEvent="clickEvent"
    />
    <form @submit.prevent="onSubmit($event)">
      <div class='custom-file mb-4'>
        <h1>Single upload files</h1>
        <input
          type='file'
          name="imagesArray"
          class='custom-file-input'
          id='customFile'
          @change="onChange($event)"
          multiple
        />
<!--        <label class="custom-file-label" for="customFile">-->
<!--          <div-->
<!--            v-for="file in filesName"-->
<!--            :key="file.fileName"-->
<!--          >-->
<!--            {{ file.fileName }}-->
<!--          </div>-->
<!--        </label>-->
        <div
          v-for="file in filesName"
          :key="file.fileName"
        >
          {{ file.fileName }}
        </div>
      </div>

      <ProgressBar :percentage="uploadPercentage" />

      <input
        type="submit"
        value="Upload"
        class='btn btn-primary btn-block mt-4'
      />
    </form>
    <div class='row mt-5' v-if="uploadedFile.fileName && uploadedFile.filePath">
      <div class='col-md-6 m-auto'>
        <h3 class='text-center'>{{ uploadedFile.fileName }}</h3>
        <img :style="{'width': '100%'}" :src="uploadedFile.filePath" alt='' />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component';
import { FILES_UPLOADED } from '@/constants/files-messages';
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
export default class UploadFIlesWithProgressBar extends Vue {
  message: string = '';
  filesName: string[] = [];
  uploadPercentage: number = 0;
  files: any = '';
  uploadedFile: IFile = {} as IFile;

  clickEvent(): void {
    this.message = '';
  }

  onChange(e: any) {
    if (!e) return;
    // eslint-disable-next-line
    console.log('e.target.files', e.target.files);
    this.files = e.target.files;
    // eslint-disable-next-line
    console.log('this.files', this.files);
  }

  async onSubmit(e: any) {
    const formData = new FormData();
    for (const i of Object.keys(this.files)) {
      formData.append('imagesArray', this.files[i])
    }
    try {
      const { data } = await axios.post('http://localhost:4000/multiple-upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent: any) => {
            this.uploadPercentage = Number(Math.round((progressEvent!.loaded * 100) / progressEvent!.total));
          }
        });

      // Clear percentage
      setTimeout(() => this.uploadPercentage = 0, 3000);

      // const { fileName, filePath } = data;

      this.filesName = data.files;

      // this.uploadedFile = {
      //   fileName,
      //   filePath,
      // };

      this.message = FILES_UPLOADED;
    } catch (err: any) {
      if (err && err.response.status === 500) {
        this.message = err.response.data.message;
      } else {
        this.message = err.response.data.message;
      }
      this.uploadPercentage = 0;
    }
  }

}
</script>

<style scoped lang="scss"></style>
