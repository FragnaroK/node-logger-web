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
    private origin;
    private debugMode;
    private colors;
    logs: LogCollection;
    constructor(origin: string, debugMode?: boolean);
    private formatedMessage;
    private logToCollection;
    getLogs(): LogCollection;
    setDebugMode(mode: boolean): void;
    l(message: string, ...args: any[]): void;
    e(message: string, ...args: any[]): void;
    d(message: string, ...args: any[]): void;
    i(message: string, ...args: any[]): void;
    blank(lines?: number): void;
}
export {};
