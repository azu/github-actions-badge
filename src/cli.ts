const meow = require("meow");
import { fetchRepositoryInfo, generate } from "./github-actions-badge";

const cli = meow(`
    Usage
      $ migrate-hatenabookmark-to-asocial-bookmark --hatena <user-name>
 
    Options
      --hatena Hatena User name
 
    Examples
      $ migrate-hatenabookmark-to-asocial-bookmark --hatena test
`, {
    flags: {
        format: {
            type: "string"
        }
    },
    autoHelp: true,
    autoVersion: true
});

export const run = async () => {
    const { repo, owner } = await fetchRepositoryInfo();
    const format = cli.flags.format || "markdown";
    const cwd = process.cwd();
    return generate({ cwd, repo, owner, format });
};
