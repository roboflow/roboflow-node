const Conf = require("conf");

const config = new Conf({
    projectSuffix: "",
    cwd: process.env.HOME + "/.config/roboflow",
    projectName: "roboflow"
});

const DEFAULTS = {
    RF_APP_URL: "https://app.roboflow.com",
    RF_API_URL: "https://api.roboflow.com",
    RF_OBJECT_DETECTION_URL: "https://detect.roboflow.com",
    RF_CLASSIFICATION_URL: "https://classify.roboflow.com",
    RF_INSTANCE_SEGMENTATION_URL: "https://outline.roboflow.com",
    RF_SEMANTIC_SEGMENTATION_URL: "https://segment.roboflow.com",
    RF_CLIP_URL: "https://infer.roboflow.com/clip"
};

// env vars take precedence over config values
function getCascadingConfigValue(key, defaultValue) {
    if (key.startsWith("RF_") && process.env[key]) {
        return process.env[key];
    } else if (config.has(key)) {
        return config.get(key);
    } else {
        return DEFAULTS[key];
    }
}

module.exports = {
    get: function (key) {
        return getCascadingConfigValue(key);
    },

    set(key, value) {
        return config.set(key, value);
    },

    getAll() {
        return {
            ...config.store,
            RF_WORKSPACE: getCascadingConfigValue("RF_WORKSPACE"),
            RF_APP_URL: getCascadingConfigValue("RF_APP_URL"),
            RF_API_URL: getCascadingConfigValue("RF_API_URL"),
            RF_OBJECT_DETECTION_URL: getCascadingConfigValue(
                "RF_OBJECT_DETECTION_URL",
                "https://detect.roboflow.com"
            ),
            RF_CLASSIFICATION_URL: getCascadingConfigValue(
                "RF_CLASSIFICATION_URL",
                "https://classify.roboflow.com"
            ),
            RF_INSTANCE_SEGMENTATION_URL: getCascadingConfigValue(
                "RF_INSTANCE_SEGMENTATION_URL",
                "https://outline.roboflow.com"
            ),
            RF_SEMANTIC_SEGMENTATION_URL: getCascadingConfigValue(
                "RF_SEMANTIC_SEGMENTATION_URL",
                "https://segment.roboflow.com"
            ),
            RF_CLIP_URL: getCascadingConfigValue(
                "RF_CLIP_URL",
                "https://infer.roboflow.com/clip"
            )
        };
    },

    clear() {
        return config.clear();
    },

    configFile: config.path
};
