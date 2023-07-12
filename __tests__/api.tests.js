const api = require("../api.js")
apiKey = process.env.apiKey
workspace = process.env.workspace
project = process.env.project
version = process.env.version
testImage = process.env.testImage

test("Get Workspace", async () => {
    let workspaceRes = await api.getWorkspace(workspace, apiKey)
    expect(workspaceRes).toHaveProperty("workspace")
})

test("Get Project", async () => {
    let projectRes = await api.getProject(workspace, project, apiKey)
    expect(projectRes).toHaveProperty("project")
})

test("Get Version", async () => {
    let versionRes = await api.getVersion(workspace, project, version, apiKey)
    expect(versionRes).toHaveProperty("version")
})

test("Upload Image", async () => {
    let uploadImageRes = await api.uploadImage(`__tests__/${testImage}`, project, apiKey)
    expect(uploadImageRes).toHaveProperty("id")
})

test("Object Detection", async () => {
    let detectImageRes = await api.detectObject(`__tests__/${testImage}`, `${project}/${version}`, apiKey)
    expect(detectImageRes).toHaveProperty("predictions")
})

test("Embed Image", async () => {
    let embedImageRes = await api.embedImage(`__tests__/${testImage}`, apiKey)
    expect(embedImageRes.embeddings[0]).toHaveLength(512)
})

test("Embed Text", async () => {
    let embedTextRes = await api.embedText("red dog", apiKey)
    expect(embedTextRes.embeddings[0]).toHaveLength(512)
})

