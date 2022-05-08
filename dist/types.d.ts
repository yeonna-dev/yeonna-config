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
    enabledCommands?: string | string[];
    commandAliases?: {
        [key: string]: string[];
    };
    pointsName?: string;
    collectiblesName?: string;
    mostCollectiblesReward?: {
        channel: string;
        prizes: number[];
    };
    roleRequestsApprovalChannel?: string;
    reactRepost?: {
        count?: number;
        channel?: string;
        color?: string;
        emote?: string;
        approval?: {
            emote: string;
            approvers: string[];
        };
    };
    items?: {
        list?: Item[];
        collections?: Collection[];
    };
    miniGames?: {
        wheelSpin: {
            reward: number;
            choices: {
                code: string;
                name: string;
                reward?: number;
            }[];
        };
    };
    streaks?: {
        name: string;
        roles: {
            [key: number]: string;
        };
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