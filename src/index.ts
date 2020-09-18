#!/usr/bin/env node

const jsonfile = require('jsonfile')
const program = require('commander');
const readline = require("readline");


class Replacer {
    private version: any;
    private ngsw: any;
    private rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    constructor(private packageFile: string, private ngswConfigFile: string, private description: string) {
        if (!description) {
            this.rl.question("Description: ", (d: any) => {
                this.description = d;
                this.rl.close();
            });
            this.rl.on('close', () => this.run());
        }
        else {
            this.run();
        }
    }


    run() {
        this.version = jsonfile.readFileSync(this.packageFile).version;
        jsonfile.readFile(this.ngswConfigFile)
            .then((d: any) => {
                this.ngsw = d || {};
                this.ngsw.appData = this.ngsw.appData ? { ...this.ngsw.appData, version: this.version } : { version: this.version };
                this.ngsw.appData.description = this.description;
                jsonfile.writeFile(this.ngswConfigFile, this.ngsw, { flag: 'w' })
                    .then((d: any) => {
                        console.log(`${this.ngswConfigFile} successfully updated.`);
                        process.exit();
                    })
                    .catch((d: any) => console.log(d))
            })
            .catch((d: any) => console.log(d));
    }
}


program
    .name('update-service-worker')
    .version('0.2.0')
    .description("CLI to update ngsw-config.json with version from package.json")
    .option('-p, --package <package.json>', 'package.json file path')
    .option('-n, --ngsw <ngsw-config.json>', 'ngsw-config.json file path')
    .option('-d --desc <update description>', 'description of the update')
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
} else {
    new Replacer(program.package, program.ngsw, program.desc);
}
