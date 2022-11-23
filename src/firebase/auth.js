import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import store from "../store";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { auth, db } from "./configuration";

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
  let qquery = query(
    collection(db, "Doctors"),
    where("username", "==", username)
  );

  let querySnapshot = await getDocs(qquery);
  if (!querySnapshot.empty) throw new Error("Username exists");

  qquery = query(collection(db, "Doctors"), where("email", "==", email));

  querySnapshot = await getDocs(qquery);
  if (!querySnapshot.empty) throw new Error("Email exists");

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

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
    phone,
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
  });
};

const registerPatient = async ({
  username,
  name,
  surname,
  gender,
  zipCode,
  dateOfBirth,
  phone,
  email,
  password,
}) => {
  //1. Checking if the username is unique
  let qquery = query(
    collection(db, "Patients"),
    where("username", "==", username)
  );

  let querySnapshot = await getDocs(qquery);
  if (!querySnapshot.empty) throw new Error("Username exists");

  qquery = query(collection(db, "Patients"), where("email", "==", email));

  querySnapshot = await getDocs(qquery);
  if (!querySnapshot.empty) throw new Error("Email exists");

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  updateProfile(user, {
    displayName: `patients`,
  });

  const patientRef = await addDoc(collection(db, "Patients"), {
    name: name.toLowerCase(),
    surname: surname.toLowerCase(),
    gender: gender.toLowerCase(),
    dateOfBirth: dateOfBirth.toLowerCase(),
    zipCode: zipCode.toLowerCase(),
    email: email.toLowerCase(),
    phone,
  });
  return new Promise((resolve) => {
    const unsubscribe = onSnapshot(patientRef, (doc) => {
      resolve(doc);
    });

    store.dispatch("setUnsubscribe", { unsubscribe, type: "patient" });
  });
};

const login = async ({ email, password, userType }) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const uid = user.user.uid;
    console.log({ uid });
    if (userType === "patient") {
      const patientsCollectionRef = collection(db, "Patients");
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          query(patientsCollectionRef, where("uid", "==", uid)),
          (querySnapshot) => {
            if (querySnapshot.empty)
              reject("Internal Error, users not properly registered");
            resolve(querySnapshot.docs[0]);
          }
        );
        store.dispatch("setUnsubscribe", { unsubscribe, type: "patient" });
        //Have to save unsubscribe
      });
    }
    if (userType === "doctor") {
      const doctorCollectionRef = collection(db, "Doctors");
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          query(doctorCollectionRef, where("uid", "==", uid)),
          (querySnapshot) => {
            if (querySnapshot.empty)
              reject("Internal Error, users not properly registered");
            resolve(querySnapshot.docs[0]);
          }
        );
        store.dispatch("setUnsubscribe", { unsubscribe, type: "doctor" });
        //Have to save unsubscribe
      });
      //Have to save the userCredential
    }
    if (userType === "admin") {
      const adminCollectionRef = collection(db, "Admin");
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          query(adminCollectionRef, where("uid", "==", uid)),
          (querySnapshot) => {
            if (querySnapshot.empty)
              reject("Internal Error,Admin has not been registered");
            resolve(querySnapshot.docs[0]);
          }
        );
        store.dispatch("setUnsubscribe", { unsubscribe, type: "admin" });
        //Have to save unsubscribe
      });
    }
    if (userType === "technician") {
      const adminCollectionRef = collection(db, "Technician");
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          query(adminCollectionRef, where("uid", "==", uid)),
          (querySnapshot) => {
            if (querySnapshot.empty)
              reject("Internal Error,Admin has not been registered");
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

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export { registerPatient, registerDoctor, registerTechnician, login, logout };
