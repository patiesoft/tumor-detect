<template>
  <v-row>In review</v-row>
</template>
<script>
import { getInReview } from "../../firebase";
export default {
  name: "InReview",
  data: () => ({
    inReview: [],
  }),
  computed: {
    doctorID() {
      return this.$store.getters.getUserDocumentSnapshot.data().doctorID;
    },
  },
  methods: {
    async getInReviewDocs() {
      const docs = getInReview({ doctorID: this.doctorID });
      this.inReview = docs;
    },
  },
};
</script>
