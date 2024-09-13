import { db } from "./firebaseConfig";
import {
  collection,
  query,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";

let lastVisible = null;
const batchSize = 20;

const fetchFirstBatch = async () => {
  const q = query(collection(db, "products"), limit(batchSize));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  return data;
};

const fetchNextBatch = async () => {
  if (!lastVisible) {
    return;
  }

  const q = query(
    collection(db, "products"),
    startAfter(lastVisible),
    limit(batchSize)
  );

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  if (data.length>0) {
    return data;
  }
};

export { fetchFirstBatch, fetchNextBatch };
