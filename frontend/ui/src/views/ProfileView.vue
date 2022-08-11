<template>
  <div class="about">
    <h1>Profile Upload IMAGE</h1>
    <form @submit.prevent="onSubmit" method="POST" encType="multipart/form-data">
      <h3>Upload Profile Photo</h3>
      <input
        type="file"
        name="file"
        accept="image/*"
        @change="onChange($event)"
        required
        single
      />
      <input type="submit" class="btn btn-primary">
    </form>

    <div class="card">
      <img
        v-if="uploadedFile"
        class="card__image"
        loading="lazy"
        alt="User Profile"
        :src="uploadedFile"
      >
      <img v-else class="card__image" src="@/assets/images/placeholders/default.jpg" loading="lazy" alt="User Profile">

      <h1 class="card__title">
        test user firstName
      </h1>
      <div class="card__job">
        test job user
      </div>
      <p class="card__about">
        test description user
      </p>
      <button
        v-if="uploadedFile"
        type="button"
        class="btn btn-primary"
        @click="removeAvatar"
      >Remove Avatar</button>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component';
import axios from 'axios';


export default class ProfileView extends Vue {
  uploadedFile: string = ''
  file: any = '';

  onChange(e: any) {
    if (!e) return;
    this.file = e.target.files[0];
  }

  removeAvatar() {
    this.uploadedFile = '';
  }

  async onSubmit(e: any) {
    const formData = new FormData();
    formData.append('file', this.file);
    try {
      const { data } = await axios.post('http://localhost:4000/single-upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });

      const { filePath } = data;

      this.uploadedFile = `http://localhost:4000${filePath}`;

    } catch (err: any) {
      if (err && err.response.status === 500) {
        alert('There was a problem with the server');
      }
    }
  }

}
</script>

<style scoped lang="scss">
  .card {

    &__image {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
</style>
