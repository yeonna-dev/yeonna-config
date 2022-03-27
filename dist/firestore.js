"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firestore = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebase = (0, app_1.initializeApp)({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
});
const firestore = (0, firestore_1.getFirestore)(firebase);
const configCollectionId = 'config';
const collectionInstance = () => (0, firestore_1.collection)(firestore, configCollectionId);
const documentInstance = (documentId) => (0, firestore_1.doc)(firestore, configCollectionId, documentId);
class Firestore {
    static getDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            const querySnapshot = yield (0, firestore_1.getDocs)(collectionInstance());
            const documents = {};
            querySnapshot.forEach(document => documents[document.id] = document.data());
            return documents;
        });
    }
    static getDocument(documentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = documentInstance(documentId);
            return (0, firestore_1.getDoc)(document);
        });
    }
    static setDocument(documentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, firestore_1.setDoc)(documentInstance(documentId), data);
            const document = yield Firestore.getDocument(documentId);
            return document.data();
        });
    }
    static updateDocument(documentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, firestore_1.setDoc)(documentInstance(documentId), data, { merge: true });
            const document = yield Firestore.getDocument(documentId);
            return document.data();
        });
    }
}
exports.Firestore = Firestore;
