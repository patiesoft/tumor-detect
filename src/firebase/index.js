import { registerDoctor, login, logout, registerPatient } from "./auth";
import { auth, db } from "./configuration";
import { generatePatientID } from "./userIds";

export {
  registerDoctor,
  login,
  logout,
  auth,
  db,
  registerPatient,
  generatePatientID,
};
