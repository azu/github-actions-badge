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
        assert.strictEqual(codes, `[![Actions Status](https://github.com/azu/github-actions-badge/workflows/ci/badge.svg)](https://github.com/azu/github-actions-badge/actions?query=workflow%3A"ci")
[![Actions Status](https://github.com/azu/github-actions-badge/workflows/test%20quote%20space's/badge.svg)](https://github.com/azu/github-actions-badge/actions?query=workflow%3A"test+quote+space's")`
        );
    });
    it("should return badge codes that replace includes-space with +", () => {
        const codes = generate({
            owner: "ruby",
            repo: "actions",
            cwd: path.join(__dirname, "fixtures/includes-space"),
            format: "markdown"
        });
        assert.strictEqual(codes, `[![Actions Status](https://github.com/ruby/actions/workflows/Make%20draft%20release%20package/badge.svg)](https://github.com/ruby/actions/actions?query=workflow%3A"Make+draft+release+package")`
        );
    });
});
