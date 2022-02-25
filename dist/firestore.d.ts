import { DocumentData } from 'firebase/firestore';
export declare class Firestore {
    static getDocuments(): Promise<{
        [key: string]: DocumentData;
    }>;
    static getDocument(documentId: string): Promise<import("firebase/firestore").DocumentSnapshot<DocumentData>>;
    static setDocument(documentId: string, data: unknown): Promise<DocumentData | undefined>;
    static updateDocument(documentId: string, data: Partial<unknown>): Promise<DocumentData | undefined>;
}
//# sourceMappingURL=firestore.d.ts.map