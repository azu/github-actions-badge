#!/usr/bin/env node

require("../lib/cli").run().then(output => {
    console.log(output);
}).catch(error => {
    console.error(error);
    process.exit(1);
});
