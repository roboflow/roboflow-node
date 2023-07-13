const config = require("./config.js");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const FormData = require("form-data");

async function api_GET(endpoint, apiKey) {
    const RF_API_URL = config.get("RF_API_URL");
    const url = `${RF_API_URL}` + endpoint;

    if (global.debug) {
        console.debug(`making request to: ${url}`);
    }

    const apiResponse = await axios.get(`${url}?api_key=${apiKey}`);

    return apiResponse.data;
}

async function getWorkspace(workspaceUrl, apiKey) {
    return api_GET(`/${workspaceUrl}`, apiKey);
}

async function getProject(workspaceUrl, projectUrl, apiKey) {
    return api_GET(`/${workspaceUrl}/${projectUrl}`, apiKey);
}

async function getVersion(workspaceUrl, projectUrl, version, apiKey) {
    return api_GET(`/${workspaceUrl}/${projectUrl}/${version}`, apiKey);
}

async function getFormat(workspaceUrl, projectUrl, version, format, apiKey) {
    return api_GET(`/${workspaceUrl}/${projectUrl}/${version}/${format}`, apiKey);
}

async function uploadImage(filepath, projectUrl, apiKey, options) {
    const filename = path.basename(filepath);

    // console.log(filename, split)
    const formData = new FormData();
    formData.append("name", filename);
    formData.append("file", fs.createReadStream(filepath));

    if (options && options.split) {
        formData.append("split", options.split);
    }

    if (options && options.batch) {
        formData.append("batch", options.batch);
    }

    try {
        const response = await axios({
            method: "POST",
            url: `${config.get("RF_API_URL")}/dataset/` + projectUrl + "/upload",
            params: {
                api_key: apiKey
            },
            data: formData,
            headers: formData.getHeaders()
        });
        return response.data;
    } catch (e) {
        if (e.response) {
            return e.response.data;
        }
        throw e;
    }
}

async function uploadAnnotationRaw(imageID, annotationName, annotationData, projectUrl, apiKey) {
    // console.log("uploadAnnotationRaw", imageID, annotationName, annotationData, projectUrl, apiKey);

    try {
        const response = await axios({
            method: "POST",
            url: `${config.get("RF_API_URL")}/dataset/${projectUrl}/annotate/${imageID}`,
            params: {
                api_key: apiKey,
                name: annotationName
            },
            data: annotationData,
            headers: {
                "Content-Type": "text/plain"
            }
        });

        return response.data;
    } catch (e) {
        if (e.response) {
            return e.response.data;
        }
        throw e;
    }
}

async function uploadAnnotation(imageID, annotationFile, projectUrl, apiKey) {
    const filename = path.basename(annotationFile);
    const annotationData = fs.readFileSync(annotationFile, "utf-8");

    try {
        const response = await axios({
            method: "POST",
            url: `${config.get("RF_API_URL")}/dataset/${projectUrl}/annotate/${imageID}`,
            params: {
                api_key: apiKey,
                name: filename
            },
            data: annotationData,
            headers: {
                "Content-Type": "text/plain"
            }
        });

        return response.data;
    } catch (e) {
        if (e.response) {
            return e.response.data;
        }
        throw e;
    }
}

async function detectObject(filepath, modelUrl, apiKey, options) {
    const image = fs.readFileSync(filepath, {
        encoding: "base64"
    });

    const response = await axios({
        method: "POST",
        url: `${config.get("RF_OBJECT_DETECTION_URL")}/${modelUrl}`,
        params: {
            api_key: apiKey,
            ...options
        },
        data: image,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    return response.data;
}

async function classify(filepath, modelUrl, apiKey) {
    const image = fs.readFileSync(filepath, {
        encoding: "base64"
    });

    const response = await axios({
        method: "POST",
        url: `${config.get("RF_CLASSIFICATION_URL")}/${modelUrl}`,
        params: {
            api_key: apiKey
        },
        data: image,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    return response.data;
}

async function instanceSegmentation(filepath, modelUrl, apiKey) {
    const image = fs.readFileSync(filepath, {
        encoding: "base64"
    });

    const response = await axios({
        method: "POST",
        url: `${config.get("RF_INSTANCE_SEGMENTATION_URL")}/${modelUrl}`,
        params: {
            api_key: apiKey
        },
        data: image,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    return response.data;
}

async function semanticSegmentation(filepath, modelUrl, apiKey) {
    const image = fs.readFileSync(filepath, {
        encoding: "base64"
    });

    const response = await axios({
        method: "POST",
        url: `${config.get("RF_SEMANTIC_SEGMENTATION_URL")}/${modelUrl}`,
        params: {
            api_key: apiKey
        },
        data: image,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    return response.data;
}

async function embedImage(filepath, apiKey) {
    const image = fs.readFileSync(filepath, {
        encoding: "base64"
    });
    const response = await axios({
        method: "POST",
        url: `${config.get("RF_CLIP_URL")}/embed_image`,
        params: {
            api_key: apiKey
        },
        data: {
            clip_version_id: "ViT-B-16",
            image: [
                {
                  type: "base64",
                  value: image
                }
              ]
        },
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response.data;
}

async function embedText(text, apiKey) {
    const response = await axios({
        method: "POST",
        url: `${config.get("RF_CLIP_URL")}/embed_text`,
        params: {
            api_key: apiKey
        },
        data: {
            clip_version_id: "ViT-B-16",
            text: text
        },
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response.data;
}

module.exports = api = {
    getWorkspace,
    getProject,
    getVersion,
    getFormat,
    uploadImage,
    uploadAnnotation,
    detectObject,
    classify,
    instanceSegmentation,
    semanticSegmentation,
    embedImage,
    embedText,
    uploadAnnotationRaw
};
