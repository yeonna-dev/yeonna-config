import { initializeApp } from 'firebase/app';
import
{
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { Document } from './types';

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
    const documents: Document[] = [];
    querySnapshot.forEach(document => documents.push({
      id: document.id,
      data: document.data(),
    }));
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
  }

  static async updateDocument(documentId: string, data: Partial<unknown>)
  {
    await updateDoc(documentInstance(documentId), data);
  }
}
