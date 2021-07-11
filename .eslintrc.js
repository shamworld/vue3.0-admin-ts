/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-05-05 21:28:36
 * @LastEditors: Roy
 * @LastEditTime: 2021-07-11 17:52:56
 * @Deprecated: 否
 * @FilePath: /vue3.0-admin-ts/.eslintrc.js
 */
module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        quotes: ['error', 'single'],
        'comma-dangle': ['error', 'never'],
        'prettier/prettier': [
            'error',
            {
                vueIndentScriptAndStyle: false,
                endOfLine: 'auto'
            }
        ],
        'no-undef': 'off',
        'space-before-function-paren': 'off',
        'no-use-before-define': 'off',
        'generator-star-spacing': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^h$',
                varsIgnorePattern: '^h$'
            }
        ],
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^h$',
                varsIgnorePattern: '^h$'
            }
        ],
        'vue/require-default-prop': 'off',
        'vue/custom-event-name-casing': 'off',
        'vue/comment-directive': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-self-closing': 'off',
        'vue/max-attributes-per-line': 'off',
        'semi': '0'
    }
}
