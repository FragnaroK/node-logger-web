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
    private colors;
    private origin;
    private debugMode;
    logs: LogCollection;
    constructor(origin: string, debugMode?: boolean);
    private formatedMessage;
    private logToCollection;
    setDebugMode(mode: boolean): void;
    l(message: string, ...args: any[]): void;
    e(message: string, ...args: any[]): void;
    d(message: string, ...args: any[]): void;
    i(message: string, ...args: any[]): void;
    blank(lines?: number): void;
}
export {};
