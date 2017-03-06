module.exports = {
    "extends": "eslint:recommended",
    "env": {
        "es6": false,
        "browser": false,
        "jasmine": true
    },
    "ecmaFeatures": {
        "modules": true
    },
    "rules": {
        "semi": [2, "always"],
        "indent": [2, 2, {"SwitchCase": 1}],
        "no-mixed-spaces-and-tabs": [2],
        "curly": [2, "all"],
        "brace-style": [2, "1tbs", { "allowSingleLine": false }]
    }
};