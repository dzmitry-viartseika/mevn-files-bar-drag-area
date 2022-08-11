<template>
  <div class="app-drag">
    <h1>DragNDropView</h1>
    <div @dragover.prevent="isDraggable = !isDraggable" @drop.prevent>
      <form @click="selectFile" @drop="dragFile($event)"  >
        <input id="inputFile" @change="onChange($event)" class="file-input" type="file" name="file" hidden>
        <i class="fas fa-cloud-upload-alt"></i>
        <p>
          <template v-if="isDraggable">
            Drop your file :D:D
          </template>
          <template v-else>
            Browse File to Upload
          </template>
        </p>
      </form>
    </div>
    <section class="progress-area"></section>
    <section
      :class="{'onprogress': uploadPercentage < 100}"
      class="uploaded-area"
    ></section>
    <div class="row">
      <div class="content">
        <div class="details">
          <svg v-if="uploadedFile" width="96px" height="96px" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="clip-file">
                <rect width="96" height="96"/>
              </clipPath>
            </defs>
            <g id="file" clip-path="url(#clip-file)">
              <g id="pills">
                <g id="Group_160" data-name="Group 160">
                  <path id="Path_191" data-name="Path 191" d="M10,84V12a8,8,0,0,1,8-8H62.563A8.3,8.3,0,0,1,68.43,6.43L83.57,21.57A8.3,8.3,0,0,1,86,27.437V84a8,8,0,0,1-8,8H18A8,8,0,0,1,10,84Z" fill="none" stroke="#58595b" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4"/>
                  <path id="Path_192" data-name="Path 192" d="M64,5V17a8,8,0,0,0,8,8H84" fill="none" stroke="#58595b" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4"/>
                  <g id="Group_159" data-name="Group 159">
                    <line id="Line_26" data-name="Line 26" x2="42" transform="translate(27 46)" fill="none" stroke="#58595b" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4"/>
                    <line id="Line_27" data-name="Line 27" x2="42" transform="translate(27 69)" fill="none" stroke="#58595b" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4"/>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <span v-if="uploadedFile" class="name">{{ uploadedFile.fileName }}</span>
          <span v-if="messageUploadingFile"> - {{ messageUploadingFile }}</span>
          <span v-if="uploadPercentage" class="percent">{{ uploadPercentage }}%</span>
        </div>
        <div class="progress-bar" v-if="uploadPercentage">
          <div class="progress"
               :style="{'width': `${uploadPercentage}%`}">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import axios from "axios";


export default class DragNDropView extends Vue {
  file: any = '';
  name: any = '';
  uploadPercentage: number = 0;
  uploadedFile: any = '';
  isDraggable: boolean = false;

  get messageUploadingFile() {
    if (!this.uploadPercentage) {
      return '';
    }
    return this.uploadPercentage <= 99 ? 'The file is Uploading currently' : 'The file was uploaded';
  }

  dragFile(e: any) {
    if (!e) return;
    this.isDraggable = true;
    this.file = e.dataTransfer.files[0];
    this.uploadFile(e.dataTransfer.files[0].name);
    this.isDraggable = false;
  }

  onChange(e: any) {
    if (!e) return;
    this.file = e.target.files[0];
    let fileName = this.file.name;
    if (fileName.length >= 12) {
      const splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    this.uploadFile(fileName);
  }

  async uploadFile(fileName: string) {
    const formData = new FormData();
    formData.append('file', this.file);
    try {
      const { data } = await axios.post('http://localhost:4000/single-upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            this.uploadPercentage = Number(Math.round((progressEvent!.loaded * 100) / progressEvent!.total));
          }
        });
      // Clear percentage
      setTimeout(() => this.uploadPercentage = 0, 3000);

      const { fileName, filePath } = data;

      this.uploadedFile = {
        fileName,
        filePath,
      };

    } catch (err: any) {
      if (err && err.response.status === 500) {
        console.error(err)
      }
      this.uploadPercentage = 0;
    }
  }

  selectFile() {
    const inputFile = document.getElementById('inputFile');
    if (inputFile) {
      inputFile.click();
    }
  }
}
</script>

<style scoped lang="scss">
::selection{
  color: #fff;
  background: #6990F2;
}
.app-drag {
  width: 430px;
  background: #fff;
  border-radius: 5px;
  padding: 30px;
  box-shadow: 7px 7px 12px rgba(0,0,0,0.05);
}
.app-drag header{
  color: #6990F2;
  font-size: 27px;
  font-weight: 600;
  text-align: center;
}
.app-drag form{
  height: 167px;
  display: flex;
  cursor: pointer;
  margin: 30px 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  border: 2px dashed #6990F2;
}
form :where(i, p){
  color: #6990F2;
}
form i{
  font-size: 50px;
}
form p{
  margin-top: 15px;
  font-size: 16px;
}
section .row{
  margin-bottom: 10px;
  background: #E9F0FF;
  list-style: none;
  padding: 15px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
section .row i{
  color: #6990F2;
  font-size: 30px;
}
section .details span{
  font-size: 14px;
}
.progress-area .row .content{
  width: 100%;
  margin-left: 15px;
}
.progress-area .details{
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  justify-content: space-between;
}
.progress-area .content .progress-bar{
  height: 6px;
  width: 100%;
  margin-bottom: 4px;
  background: #fff;
  border-radius: 30px;
}
.content .progress-bar .progress{
  height: 100%;
  width: 0%;
  background: #6990F2;
  border-radius: inherit;
}
.uploaded-area{
  max-height: 232px;
  overflow-y: scroll;
}
.uploaded-area.onprogress{
  max-height: 150px;
}
.uploaded-area::-webkit-scrollbar{
  width: 0px;
}
.uploaded-area .row .content{
  display: flex;
  align-items: center;
}
.uploaded-area .row .details{
  display: flex;
  margin-left: 15px;
  flex-direction: column;
}
.uploaded-area .row .details .size{
  color: #404040;
  font-size: 11px;
}
.uploaded-area i.fa-check{
  font-size: 16px;
}

.details {
  display: flex;
  align-items: center;
  font-size: 12px;

  svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
}
</style>
