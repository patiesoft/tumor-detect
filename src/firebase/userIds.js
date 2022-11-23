import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./configuration";

const generatePatientID = async () => {
  console.log("Hey");
  let patientCount = 0;
  const indexPath = "Index/ids";
  const documentReference = doc(db, indexPath);
  const documentSnapshot = await getDoc(documentReference);

  if (documentSnapshot.exists()) {
    patientCount = documentSnapshot.data().patientCount;
    await updateDoc(documentReference, {
      patientCount: patientCount++,
    });
    return patientCount;
  }
  await updateDoc(documentReference, {
    patientCount: patientCount++,
  });
  return 1;
};

export { generatePatientID };
