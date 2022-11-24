<template>
  <v-row justify="center" align="center">
    <v-col cols="9">
      <h1 class="text-center text-h3 font-weight-bold">MRI Scans In Review</h1>
    </v-col>
    <v-col v-for="(item, key) in inReview" :key="key" cols="9">
      <v-card class="mx-auto" max-width="944" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">
              {{ item.patient.name }} {{ item.patient.surname }}
            </div>
            <v-list-item-title class="text-h5 mb-1">
              {{ item.patient.patientID }}
            </v-list-item-title>
            <v-list-item-subtitle
              >Tumor Present:
              {{ item.results.tumor_present }}</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                Review
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Tumor Report
              </v-card-title>

              <v-card-text>
                <p class="text-h6 font-weight-regular">
                  Tumor Present: {{ item.results.tumor_present }}
                </p>
                <p class="text-h6 font-weight-regular">
                  Tumor Size: {{ item.results.tumor_size }}
                </p>
                <p class="text-h6 font-weight-regular">Tumor location:</p>
                <p class="text-h6 font-weight-regular">Accuracy Percentage:</p>
                <p class="text-h6 font-weight-regular">Observations:</p>
                <v-textarea
                  v-model="observations"
                  label="Observations"
                  rounded
                  outlined
                ></v-textarea>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  submit
                </v-btn>
                <v-btn color="primary" text @click="dialog = false">
                  close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { getInReview, doctorReviewScan } from "../../firebase";
export default {
  name: "InReview",
  data: () => ({
    inReview: [],
    dialog: false,
    observations: "",
  }),
  computed: {
    doctorID() {
      return this.$store.getters.getUserDocumentSnapshot.data().doctorID;
    },
  },
  methods: {
    async getInReviewDocs() {
      const docs = await getInReview({ doctorID: this.doctorID });
      this.inReview = docs.map((d) => d.data());
    },
    submit(id) {
      return doctorReviewScan({ id, observations: this.observations });
    },
  },
  mounted() {
    this.getInReviewDocs();
  },
};
</script>
