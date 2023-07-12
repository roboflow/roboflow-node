# Roboflow node library

Roboflow makes computer vision accessible to all developers.
[https://roboflow.com](https://roboflow.com)

**This project is under active development, use at your own risk**

## Node Module

The node module is currently a very basic wrapper around roboflow API endpoints.

You can use it like so:

```
const roboflow = require("roboflow");
const workspaceInfo = roboflow.getWorkspace(workspaceUrl, apiKey);
```

It currently includes the following functions, which are implemented in [api.js](api.js):

-   `getWorkspace(workspaceUrl, apiKey)`
-   `getProject(workspaceUrl, projectUrl, apiKey)`
-   `getVersion(workspaceUrl, projectUrl, version, apiKey)`
-   `getFormat(workspaceUrl, projectUrl, version, format, apiKey)`
-   `uploadImage(filepath, projectUrl, apiKey, options)`
-   `detectObject(filepath, modelUrl, apiKey, options)`
-   `classify(filepath, modelUrl, apiKey)`
-   `instanceSegmentation(filepath, modelUrl, apiKey)`
-   `semanticSegmentation(filepath, modelUrl, apiKey)`
-   `embedImage(filepath, apiKey)`
-   `embedText(text, apiKey)`

## Development
### Testing
The repo includes a series of `jest` tests to make sure the api wrapper functions work as expected. To run the tests you must setup a `.env` file with the following variables and run `npm run test`:
-   `apiKey` a valid roboflow api key
-   `workspace` a valid roboflow workspace which can be accessed with the given `apiKey`
-   `project` a valid roboflow project within the given `workspace`
-   `version` a valid version of the given roboflow project which has a model trained
-   `testImage` the relative path to a test image inside the `__tests__` directory such as `test.jpeg`