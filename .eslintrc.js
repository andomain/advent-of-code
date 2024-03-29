module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        'airbnb-base',
        'airbnb-typescript/base'
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": './tsconfig.json'
    },
    "rules": {
        "no-console": 0,
        "no-continue": 0,
        "import/prefer-default-export": 0,
        "no-restricted-syntax": 0,
        "max-len": ["error", { "code": 120 }],
        "no-param-reassign": 0,
    }
}
