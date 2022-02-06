import { DocumentData } from 'firebase/firestore';
export interface Configs {
    global: ConfigType;
    [key: string]: ConfigType;
}
export interface ConfigType {
    prefix?: string;
    pointsName?: string;
    collectiblesName?: string;
    mostCollectiblesReward?: {
        channel: string;
        prizes: number[];
    };
    roleRequestsApprovalChannel?: string;
    enabledCommands?: string | string[];
    reactRepost?: {
        count?: number;
        channel?: string;
        color?: string;
    };
}
export interface Document {
    id: string;
    data: DocumentData;
}
//# sourceMappingURL=types.d.ts.map