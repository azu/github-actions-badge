#!/usr/bin/env node

const meow = require("meow");
const cli = meow(`
    Usage
      $ github-actions-badge
 
    Options
      --format "markdown"
 
    Examples
      # Copy GitHub Action as Markdown format
      $ github-actions-badge | pbcopy
`, {
    flags: {
        format: {
            type: "string"
        }
    },
    autoHelp: true,
    autoVersion: true
});

