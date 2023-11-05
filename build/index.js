"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(origin, debugMode = false) {
        this.colors = {
            r: "\x1b[0m",
            red: "\x1b[31m",
            green: "\x1b[32m",
            yellow: "\x1b[33m",
            blue: "\x1b[34m",
            magenta: "\x1b[35m",
            cyan: "\x1b[36m",
            white: "\x1b[37m",
            gray: "\x1b[90m",
            grey: "\x1b[90m",
            bold: "\x1b[1m",
            dim: "\x1b[2m",
            italic: "\x1b[3m",
            underline: "\x1b[4m",
            inverse: "\x1b[7m",
            hidden: "\x1b[8m",
            strikethrough: "\x1b[9m",
        };
        this.debugMode = false;
        this.logs = {
            error: [],
            info: [],
            debug: [],
            log: []
        };
        this.origin = origin;
        this.debugMode = debugMode;
    }
    formatedMessage(message) {
        const timestamp = new Date().toLocaleTimeString(), time = `${this.colors.gray}(${timestamp})${this.colors.r}`, origin = `${this.colors.bold}[${this.origin}]${this.colors.r}`, arrow = `${this.colors.bold} > ${this.colors.r}`;
        return `${time} ${origin}${arrow}${message}`;
    }
    logToCollection(type, message, ...args) {
        if (this.logs[type].length > 50) {
            this.logs[type].shift();
        }
        this.logs[type].push(message);
    }
    setDebugMode(mode) {
        this.debugMode = mode;
    }
    l(message, ...args) {
        const log = this.formatedMessage(`${this.colors.dim}${message}${this.colors.r}`);
        console.log(log, ...args);
        this.logToCollection("log", log, ...args);
    }
    e(message, ...args) {
        const log = this.formatedMessage(`${this.colors.red}${message}${this.colors.r}`);
        console.error(log, ...args);
        this.logToCollection("error", log, ...args);
    }
    d(message, ...args) {
        if (this.debugMode) {
            const log = this.formatedMessage(`${this.colors.yellow}${message}${this.colors.r}`);
            console.debug(`${this.colors.red}(DEBUG)${this.colors.r}${log}`, ...args);
            this.logToCollection("debug", log, ...args);
        }
    }
    i(message, ...args) {
        const log = this.formatedMessage(`${this.colors.cyan}${message}${this.colors.r}`);
        console.info(log, ...args);
        this.logToCollection("info", log, ...args);
    }
    blank(lines = 1) {
        for (let i = 0; i < lines; i++) {
            console.log();
        }
    }
}
exports.default = Logger;
