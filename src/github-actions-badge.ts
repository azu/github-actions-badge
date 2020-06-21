import fs from "fs";
import path from "path";
import glob from "glob";
import yaml from "js-yaml";
import getRemoteOriginUrl from "git-remote-origin-url";
import { fromUrl } from "hosted-git-info";

const markdownEscapse = require("markdown-escape");

export interface generateOptions {
    owner: string;
    repo: string;
    cwd: string;
    format: "markdown" | "json"
}

export const fetchRepositoryInfo = (): Promise<{ owner: string; repo: string }> => {
    return getRemoteOriginUrl().then(url => {
        return fromUrl(url);
    }).then(result => {
        if (!result || !result.user || !result.project) {
            throw new Error("Can not repository info");
        }
        return {
            owner: result.user,
            repo: result.project
        };
    });
};

// FIXME: GitHub Action Spec does not define the query
const encodeWorkflowNameQuery = (name: string) => {
    return name.replace(/\s/g, "+");
};
const encodeMarkdownTitle = (name: string): string => {
    return markdownEscapse(name);
};
export const generate = (options: generateOptions): string => {
    const ymlList = glob.sync(path.join(options.cwd, ".github/workflows/*"), {
        dot: true
    });
    const items = ymlList.map(filePath => {
        const content = yaml.safeLoad(fs.readFileSync(filePath, "utf-8"));
        if (!content.name) {
            throw new Error(`${filePath} does not define name`);
        }
        return content.name;
    }).map(workflowName => {
        // --format "json"
        if (options.format === "json") {
            return {
                name: workflowName,
                actionBadgeUrl: `https://github.com/${options.owner}/${options.repo}/workflows/${encodeURIComponent(workflowName)}/badge.svg`,
                workflowUrl: `https://github.com/${options.owner}/${options.repo}/actions?query=workflow%3A"${encodeWorkflowNameQuery(workflowName)}`
            };
        } else if (options.format === "markdown") {
            // --format "markdown"
            // https://github.com/<OWNER>/<REPOSITORY>/workflows/<WORKFLOW_NAME>/badge.svg
            return `[![Actions Status: ${encodeMarkdownTitle(workflowName)}](https://github.com/${options.owner}/${options.repo}/workflows/${encodeURIComponent(workflowName)}/badge.svg)](https://github.com/${options.owner}/${options.repo}/actions?query=workflow%3A"${encodeWorkflowNameQuery(workflowName)}")`;
        }
        return;
    });
    if (options.format === "json") {
        return JSON.stringify(items);
    } else if (options.format === "markdown") {
        return items.join("\n");
    }
    return "";
};
