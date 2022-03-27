import { Configs, ConfigType } from './types';
export declare class Config {
    static config: Configs;
    static checkLoaded(): Promise<void>;
    static load(): Promise<void>;
    static all(): Promise<Configs>;
    static global(): Promise<ConfigType>;
    static ofGuild(guildId: string): Promise<ConfigType>;
    static setGuild(guildId: string, newConfig?: ConfigType): Promise<void>;
    static setGlobal(newConfig?: ConfigType): Promise<void>;
    static updateGuild(guildId: string, newConfig: ConfigType): Promise<void>;
    static updateGlobal(newConfig: ConfigType): Promise<void>;
    static getSetting(guildId: string, key: keyof ConfigType): Promise<string | string[] | {
        [key: string]: string[];
    } | {
        channel: string;
        prizes: number[];
    } | {
        count?: number | undefined;
        channel?: string | undefined;
        color?: string | undefined;
    } | {
        list?: import("./types").Item[] | undefined;
        collections?: import("./types").Collection[] | undefined;
    } | {
        wheelSpin: {
            reward: number;
            choices: {
                code: string;
                name: string;
                reward?: number | undefined;
            }[];
        };
    } | {
        name: string;
        roles: {
            [key: number]: string;
        };
    } | undefined>;
}
//# sourceMappingURL=config.d.ts.map