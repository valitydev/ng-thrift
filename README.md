# Angular Thrift Libraries

-   Angular Thrift UI

## 💻 Development with locally built/runnable library

1. [Link](https://docs.npmjs.com/cli/commands/npm-link) the library

    ```sh
    npm link ~/github/valitydev/ng-thrift/projects/ng-thrift/dist
    ```

    [Alternative](https://www.npmjs.com/package/link):

    ```sh
    npx link ~/github/valitydev/ng-thrift/projects/ng-thrift/dist
    ```

1. Start Library

    ```sh
    # cd ../ng-thrift
    npm start
    ```

1. Start your app

    ```sh
    # cd ../your-app
    npm start
    ```

### 📦 Preparing a Pull Request in your application along with the library

To do this, you can use the version published in the NPM (with the `pr` tag) from your PR to the library:

```sh
npm i --save-exact @vality/ng-thrift@pr
```

_The latest version with the tag can also be [viewed in NPM](https://www.npmjs.com/package/@vality/ng-thrift?activeTab=versions)_

## Publish

Apply the PR label `publish` to all packages, or specify it for individual packages like `publish ng-thrift` for the `ng-thrift` package.
