module.exports = {
    extends: ['@zsdx'],
    parserOptions: {
        allowImportExportEverywhere: true // 不限制eslint对import使用位置
    },
    plugins: ['simple-import-sort'],
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        'simple-import-sort/imports': 'error',
        'import/order': 'off',
        'vue/no-textarea-mustache': 'off'
    }
};
