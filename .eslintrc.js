module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": "standard-with-typescript",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs,}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/return-await": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/method-signature-style": "off",
      "@typescript-eslint/consistent-type-assertions": "off"
    }
}
