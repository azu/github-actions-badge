import fs from "fs";
import path from "path";
import glob from "glob";
import yaml from "js-yaml";
import getRemoteOriginUrl from "git-remote-origin-url";
import { fromUrl } from "hosted-git-info";

export interface generateOptions {
    owner: string;
    repo: string;
    cwd: string;
    format: "markdown"
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
export const generate = (options: generateOptions): string => {
    const ymlList = glob.sync(path.join(options.cwd, ".github/workflows/*"), {
        dot: true
    });
    return ymlList.map(filePath => {
        const content = yaml.safeLoad(fs.readFileSync(filePath, "utf-8"));
        if (!content.name) {
            throw new Error(`${filePath} does not define name`);
        }
        return content.name;
    }).map(workflowName => {
        // https://github.com/<OWNER>/<REPOSITORY>/workflows/<WORKFLOW_NAME>/badge.svg
        return `[![Actions Status](https://github.com/${options.owner}/${options.repo}/workflows/${encodeURIComponent(workflowName)}/badge.svg)](https://github.com/${options.owner}/${options.repo}/actions?query=workflow%3A${encodeURIComponent(workflowName)})`;
    }).join("\n");
};
