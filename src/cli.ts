import meow from "meow";
import { fetchRepositoryInfo, generate } from "./github-actions-badge";

const cli = meow(`
    Usage
      $ github-actions-badge
 
    Options
      --format "markdown", "json"
 
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

export const run = async () => {
    const { repo, owner } = await fetchRepositoryInfo();
    const format = cli.flags.format || "markdown";
    if (format !== "json" && format !== "markdown") {
        throw new Error(`${format} is unknown format`);
    }
    const cwd = process.cwd();
    return generate({ cwd, repo, owner, format });
};
