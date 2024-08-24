import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Databse_config/firebase";

export async function registerUser(data) {
  const auth = getAuth();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;

    // Optionally, add additional user data to Firestore
    const doc = await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: data.name,
      email: user.email,
    });

    return { user, docid: doc.id };
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // Rethrow error to handle it in the calling function
  }
}
