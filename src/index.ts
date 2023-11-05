
interface LoggerInterface {
    l: (message: string, ...args: any[]) => void;
    e: (message: string, ...args: any[]) => void;
    d: (message: string, ...args: any[]) => void;
    i: (message: string, ...args: any[]) => void;
}

interface LogCollection {
    error: string[];
    info: string[];
    debug: string[];
    log: string[];
}

export default class Logger implements LoggerInterface {

    private colors = {
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
    }

    private origin: string;
    private debugMode: boolean = false;

    public logs: LogCollection = {
        error: [],
        info: [],
        debug: [],
        log: []
    }

    constructor(origin: string, debugMode: boolean = false) {
        this.origin = origin;
        this.debugMode = debugMode;
    }

    private formatedMessage(message: string) {
        const timestamp = new Date().toLocaleTimeString(),
            time = `${this.colors.gray}(${timestamp})${this.colors.r}`,
            origin = `${this.colors.bold}[${this.origin}]${this.colors.r}`,
            arrow = `${this.colors.bold} > ${this.colors.r}`;

        return `${time} ${origin}${arrow}${message}`;
    }

    private logToCollection(type: keyof LogCollection, message: string, ...args: any[]) {
        if (this.logs[type].length > 50) {
            this.logs[type].shift();
        }

        this.logs[type].push(message);
    }

    setDebugMode(mode: boolean) {
        this.debugMode = mode;
    }

    l(message: string, ...args: any[]) {
        const log = this.formatedMessage(`${this.colors.dim}${message}${this.colors.r}`)
        console.log(log, ...args);
        this.logToCollection("log", log, ...args)

    }

    e(message: string, ...args: any[]) {
        const log = this.formatedMessage(`${this.colors.red}${message}${this.colors.r}`);
        console.error(log, ...args);
        this.logToCollection("error", log, ...args)
    }

    d(message: string, ...args: any[]) {
        if (this.debugMode) {
            const log = this.formatedMessage(`${this.colors.yellow}${message}${this.colors.r}`)
            console.debug(`${this.colors.red}(DEBUG)${this.colors.r}${log}`, ...args);
            this.logToCollection("debug", log, ...args)
        }
    }

    i(message: string, ...args: any[]) {
        const log = this.formatedMessage(`${this.colors.cyan}${message}${this.colors.r}`)
        console.info(log, ...args);
        this.logToCollection("info", log, ...args)
    }

    blank(lines: number = 1) {
        for (let i = 0; i < lines; i++) {
            console.log();
        }
    }
}