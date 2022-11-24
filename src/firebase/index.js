import {
  registerDoctor,
  login,
  logout,
  registerPatient,
  generatePatientID,
  getDoctorByDoctorID,
  getPatientByPatientID,
  sendInReviewToDoctor,
  getInReview,
} from "./auth";
import { auth, db } from "./configuration";

export {
  registerDoctor,
  login,
  logout,
  auth,
  db,
  registerPatient,
  generatePatientID,
  getDoctorByDoctorID,
  getPatientByPatientID,
  sendInReviewToDoctor,
  getInReview,
};
