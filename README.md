![GitHub and NPM Package](https://github.com/mareklesko/update-service-worker/workflows/GitHub%20and%20NPM%20Package/badge.svg?branch=master)
# update-service-worker.js

Simple CLI for updating the angular **ngsw-config.json** with current app version from **package.json** for PWAs.

## Quick Example

    update-service-worker -p ./package.json -n ./ngsw-config.json -d 'description of changes'

### DESCRIPTION parameter

If the parameter is omitted then it will be asked in command line.
