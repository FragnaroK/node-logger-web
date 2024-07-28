
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

    private origin: string;
    private debugMode: boolean = false;
    private isChrome: boolean = !!(window as any).chrome
    private colors = {
        r: this.isChrome ? "\x1b[0m" : '',
        red: this.isChrome ? "\x1b[31m" : '',
        green: this.isChrome ? "\x1b[32m" : '',
        yellow: this.isChrome ? "\x1b[33m" : '',
        blue: this.isChrome ? "\x1b[34m" : '',
        magenta: this.isChrome ? "\x1b[35m" : '',
        cyan: this.isChrome ? "\x1b[36m" : '',
        white: this.isChrome ? "\x1b[37m" : '',
        gray: this.isChrome ? "\x1b[90m" : '',
        grey: this.isChrome ? "\x1b[90m" : '',
        bold: this.isChrome ? "\x1b[1m" : '',
        dim: this.isChrome ? "\x1b[2m" : '',
        italic: this.isChrome ? "\x1b[3m" : '',
        underline: this.isChrome ? "\x1b[4m" : '',
        inverse: this.isChrome ? "\x1b[7m" : '',
        hidden: this.isChrome ? "\x1b[8m" : '',
        strikethrough: this.isChrome ? "\x1b[9m" : '',
    } as const;

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

        this.logs[type].push(`${message} - ${args.join(" ")}`);
    }

    public getLogs() {
        return this.logs;
    }

    public setDebugMode(mode: boolean) {
        this.debugMode = mode;
    }

    public l(message: string, ...args: any[]) {
        const log = this.formatedMessage(`${this.colors.dim}${message}${this.colors.r}`)
        console.log(log, ...args);
        this.logToCollection("log", log, ...args)

    }

    public e(message: string, ...args: any[]) {
        const log = this.formatedMessage(`${this.colors.red}${message}${this.colors.r}`);
        console.error(log, ...args);
        this.logToCollection("error", log, ...args)
    }

    public d(message: string, ...args: any[]) {
        if (this.debugMode) {
            const log = this.formatedMessage(`${this.colors.yellow}${message}${this.colors.r}`)
            console.debug(`${this.colors.red}(DEBUG)${this.colors.r}${log}`, ...args);
            this.logToCollection("debug", log, ...args)
        }
    }

    public i(message: string, ...args: any[]) {
        const log = this.formatedMessage(`${this.colors.cyan}${message}${this.colors.r}`)
        console.info(log, ...args);
        this.logToCollection("info", log, ...args)
    }

    public blank(lines: number = 1) {
        for (let i = 0; i < lines; i++) {
            console.log();
        }
    }
}