import { Document } from './types';
export declare class Firestore {
    static getDocuments(): Promise<Document[]>;
    static getDocument(documentId: string): Promise<import("firebase/firestore").DocumentSnapshot<import("firebase/firestore").DocumentData>>;
    static setDocument(documentId: string, data: unknown): Promise<void>;
    static updateDocument(documentId: string, data: Partial<unknown>): Promise<void>;
}
//# sourceMappingURL=firestore.d.ts.map