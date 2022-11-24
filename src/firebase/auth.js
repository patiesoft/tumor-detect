import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import store from "../store";

import router from "../router";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "./configuration";

const generatePatientID = async () => {
  let patientID = 0;
  const patientIDCountPath = "Index/index";
  const documentReference = doc(db, patientIDCountPath);
  const documentSnapshot = await getDoc(documentReference);

  if (documentSnapshot.exists()) {
    patientID = documentSnapshot.data().patientID;
    patientID++;
    await updateDoc(documentReference, {
      patientID,
    });
    return patientID;
  }
  patientID++;
  await setDoc(documentReference, {
    patientID,
  });
  return patientID;
};

const generateDoctorID = async () => {
  let doctorID = 0;
  const doctorIDCountPath = "Index/index2";
  const documentReference = doc(db, doctorIDCountPath);
  const documentSnapshot = await getDoc(documentReference);

  if (documentSnapshot.exists()) {
    doctorID = documentSnapshot.data().doctorID;
    doctorID++;
    await updateDoc(documentReference, {
      doctorID,
    });
    return doctorID;
  }
  doctorID++;
  await setDoc(documentReference, {
    doctorID,
  });
  return doctorID;
};

const registerDoctor = async ({
  username,
  name,
  surname,
  specialization,
  experience,
  phone,
  email,
  password,
}) => {
  //Checking that the Doctor username exists
  const doctorID = await generateDoctorID();
  console.log({ doctorID });

  let qquery = query(
    collection(db, "Doctors"),
    where("doctorID", "==", doctorID)
  );

  let querySnapshot = await getDocs(qquery);
  if (!querySnapshot.empty) throw new Error("Username exists");

  // qquery = query(collection(db, "Doctors"), where("email", "==", email));

  // querySnapshot = await getDocs(qquery);
  // if (!querySnapshot.empty) throw new Error("Email exists");
  const { user } = await createUserWithEmailAndPassword(
    auth,
    `D${doctorID + 100}@gmail.com`,
    password
  );

  updateProfile(user, {
    displayName: `doctor`,
  });

  //Have to make sure that there is no user with the same username

  await addDoc(collection(db, "Doctors"), {
    name: name.toLowerCase(),
    surname: surname.toLowerCase(),
    username: username.toLowerCase(),
    specialization: specialization.toLowerCase(),
    experience: experience.toLowerCase(),
    email: email.toLowerCase(),
    doctorID: `D${doctorID + 100}`,
    phone,
    uid: user.uid,
  });
};

const registerTechnician = async ({
  username,
  name,
  surname,
  phone,
  email,
  password,
}) => {
  //Checking that the Technician username exists
  let qquery = query(
    collection(db, "Technicians"),
    where("username", "==", username)
  );

  let querySnapshot = await getDocs(qquery);
  if (!querySnapshot.empty) throw new Error("Username exists");

  qquery = query(collection(db, "Technicians"), where("email", "==", email));

  querySnapshot = await getDocs(qquery);
  if (!querySnapshot.empty) throw new Error("Email exists");

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  updateProfile(user, {
    displayName: `technician`,
  });

  //Have to make sure that there is no user with the same username

  await addDoc(collection(db, "Technicians"), {
    name: name.toLowerCase(),
    surname: surname.toLowerCase(),
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    phone,
    uid: user.uid,
  });
};

const registerPatient = async ({
  name,
  surname,
  gender,
  pinCode,
  age,
  phone,
  email,
  password,
}) => {
  //1. Checking if the username is unique
  const patientID = await generatePatientID();
  let qquery = query(
    collection(db, "Patients"),
    where("patientID", "==", patientID)
  );

  let querySnapshot = await getDocs(qquery);
  if (!querySnapshot.empty) throw new Error("Username exists");

  // qquery = query(collection(db, "Patients"), where("email", "==", email));

  // querySnapshot = await getDocs(qquery);
  // if (!querySnapshot.empty) throw new Error("Email exists");

  const { user } = await createUserWithEmailAndPassword(
    auth,
    `P${patientID + 100}@gmail.com`,
    password
  );

  updateProfile(user, {
    displayName: `patients`,
  });

  const patientRef = await addDoc(collection(db, "Patients"), {
    name: name.toLowerCase(),
    surname: surname.toLowerCase(),
    gender: gender.toLowerCase(),
    age,
    //dateOfBirth: dateOfBirth.toLowerCase(),
    pinCode: pinCode.toLowerCase(),
    email: email.toLowerCase(),
    phone,
    patientID: `P${patientID + 100}`,
    uid: user.uid,
  });
  return new Promise((resolve) => {
    const unsubscribe = onSnapshot(patientRef, (doc) => {
      resolve(doc);
    });

    store.dispatch("setUnsubscribe", { unsubscribe, type: "patient" });
  });
};

const login = async ({ doctorID, patientID, email, password, userType }) => {
  try {
    console.log({ doctorID, patientID, email, password, userType });
    if (userType === "patient") {
      if (!patientID) throw new Error("No patient ID");
      const user = await signInWithEmailAndPassword(
        auth,
        `P${patientID}@gmail.com`,
        password
      );
      const uid = user.user.uid;
      console.log({ uid });
      const patientsCollectionRef = collection(db, "Patients");
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          query(patientsCollectionRef, where("patientID", "==", patientID)),
          (querySnapshot) => {
            if (querySnapshot.empty)
              reject("Internal Error, users not properly registered");
            store.dispatch("setUserDocumentSnapshot", querySnapshot.docs[0]);
            resolve(querySnapshot.docs[0]);
          }
        );
        store.dispatch("setUnsubscribe", { unsubscribe, type: "patient" });
        //Have to save unsubscribe
      });
    }
    if (userType === "doctor") {
      if (!doctorID) throw new Error("No doctor ID");
      console.log({ doctorID, password });
      const user = await signInWithEmailAndPassword(
        auth,
        `${doctorID}@gmail.com`,
        password
      );
      console.log("hi");
      const uid = user.user.uid;
      console.log({ uid });
      const doctorCollectionRef = collection(db, "Doctors");
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          query(doctorCollectionRef, where("doctorID", "==", doctorID)),
          (querySnapshot) => {
            if (querySnapshot.empty)
              reject("Internal Error, users not properly registered");
            store.dispatch("setUserDocumentSnapshot", querySnapshot.docs[0]);
            resolve(querySnapshot.docs[0]);
          }
        );
        store.dispatch("setUnsubscribe", { unsubscribe, type: "doctor" });
        //Have to save unsubscribe
      });
      //Have to save the userCredential
    }
    if (userType === "admin") {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const uid = user.user.uid;
      console.log({ uid });
      const adminCollectionRef = collection(db, "Admin");
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          query(adminCollectionRef, where("uid", "==", uid)),
          (querySnapshot) => {
            if (querySnapshot.empty)
              reject("Internal Error,Admin has not been registered");
            store.dispatch("setUserDocumentSnapshot", querySnapshot.docs[0]);
            resolve(querySnapshot.docs[0]);
          }
        );
        store.dispatch("setUnsubscribe", { unsubscribe, type: "admin" });
        //Have to save unsubscribe
      });
    }
    if (userType === "technician") {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const uid = user.user.uid;
      console.log({ uid });
      const adminCollectionRef = collection(db, "Technician");
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          query(adminCollectionRef, where("uid", "==", uid)),
          (querySnapshot) => {
            if (querySnapshot.empty)
              reject("Internal Error,Admin has not been registered");
            store.dispatch("setUserDocumentSnapshot", querySnapshot.docs[0]);
            resolve(querySnapshot.docs[0]);
          }
        );
        store.dispatch("setUnsubscribe", { unsubscribe, type: "admin" });
        //Have to save unsubscribe
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getPatientByPatientID = async ({ patientID }) => {
  const patientsCollectionRef = collection(db, "Patients");
  const qquery = query(
    patientsCollectionRef,
    where("patientID", "==", patientID)
  );
  const querySnapshot = await getDocs(qquery);
  if (querySnapshot.empty) {
    return null;
  }
  return querySnapshot.docs[0];
};

const getDoctorByDoctorID = async ({ doctorID }) => {
  console.log({ doctorID });
  const patientsCollectionRef = collection(db, "Doctors");
  const qquery = query(
    patientsCollectionRef,
    where("doctorID", "==", doctorID)
  );
  const querySnapshot = await getDocs(qquery);
  if (querySnapshot.empty) {
    return null;
  }
  console.log(querySnapshot.docs[0].data());
  return querySnapshot.docs[0];
};

const getInReview = async ({ doctorID }) => {
  console.log("GET IN REVIEW");
  const qquery = query(
    collection(db, "In-Reviews"),
    where("doctor.doctorID", "==", doctorID)
  );
  const querySnapshot = await getDocs(qquery);
  console.log("OUT OF INREVIEW");
  return querySnapshot.docs;
};

const sendInReviewToDoctor = async ({ doctor, patient, results }) => {
  const collectionReference = collection(db, "In-Reviews");
  await addDoc(collectionReference, {
    id: new Date.now(),
    patient,
    doctor,
    results,
    reviewed: false,
  });
};

const doctorReviewScan = async ({ id, observation }) => {
  const querySnapshot = await getDocs(
    query(collection(db, "In-Reviews"), where("id", "==", id))
  );
  const documentSnapshot = querySnapshot.docs[0];
  const documentReference = documentSnapshot.ref;

  await updateDoc(documentReference, {
    observation,
    reviewed: true,
  });
};

const logout = async () => {
  try {
    await signOut(auth);
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export {
  registerPatient,
  registerDoctor,
  registerTechnician,
  login,
  logout,
  generatePatientID,
  getPatientByPatientID,
  getDoctorByDoctorID,
  sendInReviewToDoctor,
  getInReview,
  doctorReviewScan,
};
