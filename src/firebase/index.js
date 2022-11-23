import {
  registerDoctor,
  login,
  logout,
  registerPatient,
  generatePatientID,
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
};
