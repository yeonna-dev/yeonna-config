import { initializeApp } from 'firebase/app';
import
{
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

const firebase = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const firestore = getFirestore(firebase);

const configCollectionId = 'config';
const collectionInstance = () => collection(firestore, configCollectionId);
const documentInstance = (documentId: string) => doc(firestore, configCollectionId, documentId);

export class Firestore
{
  static async getDocuments()
  {
    const querySnapshot = await getDocs(collectionInstance());
    const documents: { [key: string]: DocumentData; } = {};
    querySnapshot.forEach(document => documents[document.id] = document.data());
    return documents;
  }

  static async getDocument(documentId: string)
  {
    const document = documentInstance(documentId);
    return getDoc(document);
  }

  static async setDocument(documentId: string, data: unknown)
  {
    await setDoc(documentInstance(documentId), data);
    const document = await Firestore.getDocument(documentId);
    return document.data();
  }

  static async updateDocument(documentId: string, data: Partial<unknown>)
  {
    await setDoc(documentInstance(documentId), data, { merge: true });
    const document = await Firestore.getDocument(documentId);
    return document.data();
  }
}
