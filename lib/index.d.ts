#!/usr/bin/env node
declare const jsonfile: any;
declare const program: any;
declare const readline: any;
declare class Replacer {
    private packageFile;
    private ngswConfigFile;
    private description;
    private version;
    private ngsw;
    private rl;
    constructor(packageFile: string, ngswConfigFile: string, description: string);
    run(): void;
}
