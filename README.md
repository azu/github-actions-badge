# github-actions-badge [![Actions Status: test](https://github.com/azu/github-actions-badge/workflows/test/badge.svg)](https://github.com/azu/github-actions-badge/actions?query=workflow%3A"test")

A command line tool that generate GitHub Actions badge Markdown code.

- https://help.github.com/en/actions/automating-your-workflow-with-github-actions/configuring-a-workflow#adding-a-workflow-status-badge-to-your-repository

## Install

Install with [npm](https://www.npmjs.com/):

    npm install github-actions-badge --global

## Usage

    Usage
      $ github-actions-badge
 
    Options
      --format "markdown", "json"
 
    Examples
      # Copy GitHub Action as Markdown format
      $ github-actions-badge | pbcopy

**Example**

```
$ github-actions-badge
[![Actions Status: test](https://github.com/azu/github-actions-badge/workflows/ci/badge.svg)](https://github.com/azu/github-actions-badge/actions?query=workflow%3Aci)
```

## Changelog

See [Releases page](https://github.com/azu/github-actions-badge/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/github-actions-badge/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
