import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Databse_config/firebase";

export async function loginCheckInDataBase({ email, password }) {
  const auth = getAuth();
  let userDocId = null;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Assuming there's only one document per user UID
      const userDoc = querySnapshot.docs[0];
      userDocId = userDoc.id;
    }
    console.log(userDocId);
    return { user, userDocId };
  } catch (err) {
    console.log(err);
  }
}
