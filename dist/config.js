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
exports.Config = void 0;
const firestore_1 = require("./firestore");
const globalConfigDocumentId = 'global';
let loaded = false;
class Config {
    static checkLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!loaded)
                yield Config.load();
        });
    }
    static load() {
        return __awaiter(this, void 0, void 0, function* () {
            /* Load the configs from Firestore. */
            const configs = (yield firestore_1.Firestore.getDocuments()) || [];
            const loadedConfig = {};
            /* Populate the config object with all the configs from Firestore. */
            for (const config of configs)
                loadedConfig[config.id] = config.data;
            /* Initialize it if it's not yet created. */
            if (!loadedConfig.global)
                yield firestore_1.Firestore.setDocument(globalConfigDocumentId, {});
            Config.config = Object.assign({ global: {} }, loadedConfig);
            loaded = true;
        });
    }
    static all() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Config.checkLoaded();
            return Config.config;
        });
    }
    static global() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Config.checkLoaded();
            return Config.config.global;
        });
    }
    static ofGuild(guildId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Config.checkLoaded();
            /* Initialize the guild config if not yet existing. */
            if (!Config.config[guildId])
                yield firestore_1.Firestore.setDocument(guildId, {});
            return Config.config[guildId];
        });
    }
    static setGuild(guildId, newConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Config.checkLoaded();
            yield firestore_1.Firestore.setDocument(guildId, newConfig || Config.config[guildId]);
            if (newConfig)
                Config.config[guildId] = newConfig;
        });
    }
    static setGlobal(newConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Config.setGuild(globalConfigDocumentId, newConfig);
        });
    }
    static updateGuild(guildId, newConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Config.checkLoaded();
            yield firestore_1.Firestore.updateDocument(guildId, newConfig);
            Config.config[guildId] = Object.assign(Object.assign({}, Config.config[guildId]), newConfig);
        });
    }
    static updateGlobal(newConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Config.updateGuild(globalConfigDocumentId, newConfig);
        });
    }
    static getSetting(guildId, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const setting = Config.config[guildId][key];
            return setting || Config.config.global[key];
        });
    }
}
exports.Config = Config;
Config.config = { global: {} };
;
