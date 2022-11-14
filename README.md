# Roboflow node library

Roboflow makes computer vision accessible to all developers.
[https://roboflow.ai](https://roboflow.ai)

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
