<template>
  <v-container class="d-flex flex-column justify-center align-center">
    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-text-field
          outlined
          rounded
          label="Patient Username"
          v-model="name"
        ></v-text-field>
      </v-col>
      <v-col cols="8">
        <v-text-field
          rounded
          outlined
          label="Doctor Username"
          v-model="surname"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input
          show-size
          label="Select Image"
          accept="image/*"
          @change="selectImage"
        ></v-file-input>
      </v-col>

      <v-col cols="4" class="pl-2">
        <v-btn color="success" dark small @click="upload">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <div v-if="progress">
      <div>
        <v-progress-linear
          v-model="progress"
          color="light-blue"
          height="25"
          reactive
        >
          <strong>{{ progress }} %</strong>
        </v-progress-linear>
      </div>
    </div>

    <v-layout v-if="previewImage">
      <v-flex>
        <!-- <img class="mx-2 my-3" :src="previewImage" alt="" />-->
        <v-slider
          v-model="width"
          class="align-self-stretch"
          min="200"
          max="500"
          step="1"
        ></v-slider>

        <v-img
          :aspect-ratio="16 / 9"
          :width="width"
          :src="previewImage"
        ></v-img>
      </v-flex>
    </v-layout>

    <v-alert v-if="message" border="left" color="blue-grey" dark>
      {{ message }}
    </v-alert>

    <v-card class="mx-auto" max-width="344" outlined v-if="modelResult">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">Prediction Result</div>
          <v-list-item-title class="text-h5 mb-1">
            {{ patient.name }} {{ patient.surname }}
          </v-list-item-title>
          <v-container v-if="modelResult && modelResult.tumor_present">
            <v-list-item-subtitle>Tumor Present</v-list-item-subtitle>
            <v-list-item-subtitle>{{
              modelResult.tumor_size
            }}</v-list-item-subtitle>
            <v-list-item-subtitle
              >{{ modelResult.confidence }}% confidence</v-list-item-subtitle
            >
          </v-container>
          <v-container v-else>
            <v-list-item-subtitle>No Tumor</v-list-item-subtitle>
          </v-container>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey"
          ><v-img :src="previewImage"></v-img
        ></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text> Send to Doctor </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-if="imageInfos.length > 0" class="mx-auto">
      <v-list>
        <v-subheader>List of Images</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(image, index) in imageInfos" :key="index">
            <a :href="image.url">{{ image.name }}</a>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>
<script>
import uploadService from "../services/uploadFilesService.js";
//Have to use the patient username to get patient data
//Have to use the doctor username to get doctor data
export default {
  name: "upload-image",
  data() {
    return {
      patient: {
        name: "Phathizwe",
        surname: "Vilakazi",
      },
      doctor: {
        name: "Rajesh",
        surname: "Miller",
      },
      modelResult: undefined,
      width: 300,
      currentImage: undefined,
      previewImage: undefined,
      name: "",
      surname: "",
      id_number: "",
      progress: 0,
      message: "",

      imageInfos: [],
    };
  },
  methods: {
    selectImage(image) {
      this.currentImage = image;
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.progress = 0;
      this.message = "";
    },

    upload() {
      if (!this.currentImage) {
        this.message = "Please select an Image!";
        return;
      }

      this.progress = 0;

      return uploadService
        .upload(
          {
            tumor: this.currentImage,
          },
          (event) => {
            this.progress = Math.round((100 * event.loaded) / event.total);
          }
        )
        .then((res) => {
          this.modelResult = res.data;
          this.message = "Picture Uploaded";
        })
        .catch((err) => {
          this.progress = 0;
          this.message = "Could not upload the image! " + err;
          this.currentImage = undefined;
        });
    },
  },
};
</script>
