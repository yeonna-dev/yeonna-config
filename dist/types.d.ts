import { DocumentData } from 'firebase/firestore';
export interface Document {
    id: string;
    data: DocumentData;
}
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
    items?: {
        list?: Item[];
        collections?: Collection[];
    };
}
export interface Item {
    code: string;
    name: string;
    chanceMin: number;
    chanceMax: number;
    price: number;
    image?: string;
    emote?: string;
    categoryId?: string;
}
export interface Collection {
    code: string;
    name: string;
    itemCodes: string[];
    fixedBonus?: number;
}
//# sourceMappingURL=types.d.ts.map