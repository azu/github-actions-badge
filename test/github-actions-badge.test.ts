import path from "path";
import { generate } from "../src/github-actions-badge";
import * as assert from "assert";

describe("github-actions-badge", function() {
    it("should return badge codes", () => {
        const codes = generate({
            owner: "azu",
            repo: "github-actions-badge",
            cwd: path.join(__dirname, ".."),
            format: "markdown"
        });
        assert.strictEqual(codes, `[![Actions Status](https://github.com/azu/github-actions-badge/workflows/ci/badge.svg)](https://github.com/azu/github-actions-badge/actions?query=workflow%3Aci)`
        );
    });
});
