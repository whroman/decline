module.exports = {
    "parser": "babel-eslint", // I want to use babel-eslint for parsing!
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "plugins": [
        "react"
    ],
    "extends": "eslint:recommended",
    "rules": {
        "comma-dangle": 0, // dangling commas are ok
        "indent": [2, 4, { "SwitchCase": 1 }],
        "jsx-quotes": [2, "prefer-single"],
        "quotes": [2, "single"],
        "react/display-name": 1,
        "react/forbid-prop-types": 0,
        "react/sort-prop-types": 0,
        "react/jsx-boolean-value": 1,
        "react/jsx-closing-bracket-location": 1,
        "react/jsx-curly-spacing": [2, "always"], // Enforce spaces within JSX props
        "react/jsx-indent-props": [2, 4],
        "react/jsx-max-props-per-line": 1,
        "react/jsx-no-duplicate-props": 1,
        "react/jsx-no-literals": 1,
        "react/jsx-no-undef": 1,
        "react/jsx-sort-props": 0,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/no-danger": 1,
        "react/no-did-mount-set-state": 1,
        "react/no-did-update-set-state": 1,
        "react/no-direct-mutation-state": 1,
        "react/no-multi-comp": 1,
        "react/no-set-state": 0, // Disabled to allow use of setState in components.
        "react/no-unknown-property": 1,
        "react/prefer-es6-class": 1,
        "react/prop-types": 1,
        "react/react-in-jsx-scope": 1,
        "react/require-extension": 1,
        "react/self-closing-comp": 1,
        "react/sort-comp": 0,
        "react/wrap-multilines": 1,
        "semi": [2, "always"]
    }
}