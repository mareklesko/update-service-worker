#!/usr/bin/env node


const jsonfile = require('jsonfile')
const program = require('commander');



class Replacer {
    private version: any;
    private ngsw: any;
    constructor(private packageFile: string, private ngswConfigFile: string) { }

    run() {
        this.version = jsonfile.readFileSync(this.packageFile).version;
        this.ngsw = jsonfile.readFileSync(this.ngswConfigFile);
        this.ngsw.appData = this.ngsw.appData ? { ...this.ngsw.appData, version: this.version } : { version: this.version };
        jsonfile.writeFileSync(this.ngswConfigFile, this.ngsw, { flag: 'w' });
    }
}


program
    .name('update-service-worker')
    .version('0.2.0')
    .description("CLI to update ngsw-config.json with version from package.json")
    .option('-p, --package <package.json>', 'package.json file path')
    .option('-n, --ngsw <ngsw-config.json>', 'ngsw-config.json file path')
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
} else {
    var r = new Replacer(program.package, program.ngsw);
    r.run();
}
