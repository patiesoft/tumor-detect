import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userCredential: null,
    patientUnsubscribe: null,
    doctorUnsubscribe: null,
    adminUnsubscribe: null,
    userDocumentSnapshot: null,
  },
  getters: {
    getPatientUnsubscribe: (state) => state.patientUnsubscribe,
    getDoctorUnsubscribe: (state) => state.doctorUnsubscribe,
    getAdminUnsubscribe: (state) => state.adminUnsubscribe,
    getUserCredentials: (state) => state.userCredential,
    getUserDocumentSnapshot: (state) => state.userDocumentSnapshot,
    // getUID: (state, getters) => getters.getUserCredentials.uid,
  },
  mutations: {
    SET_DOCTOR_UNSUBSCRIBE(state, unsubcribe) {
      state.doctorUnsubscribe = unsubcribe;
    },
    SET_PATIENT_UNSUBSCRIBE(state, unsubcribe) {
      state.patientUnsubscribe = unsubcribe;
    },
    SET_ADMIN_UNSUBSCRIBE(state, unsubcribe) {
      state.adminUnsubscribe = unsubcribe;
    },
    SET_USER_DOCUMENT_SNAPSHOT(state, doc) {
      state.userDocumentSnapshot = doc;
    },
  },
  actions: {
    setUnsubscribe({ commit }, { unsubscribe, type }) {
      if (type == "doctor")
        return commit("SET_DOCTOR_UNSUBSCRIBE", unsubscribe);
      if (type == "patient")
        return commit("SET_PATIENT_UNSUBSCRIBE", unsubscribe);
      if (type == "admin") return commit("SET_ADMIN_UNSUBSCRIBE", unsubscribe);

      throw new Error("Unknow unsubscribe type");
    },
    setUserDocumentSnapshot({ commit }, documentSnapshot) {
      console.log("hhhhhhhhhhhhhhhh");
      return commit("SET_USER_DOCUMENT_SNAPSHOT", documentSnapshot);
    },
  },
  modules: {},
});
