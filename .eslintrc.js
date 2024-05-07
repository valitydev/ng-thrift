module.exports = {
    extends: '@vality/eslint-config',
    overrides: [
        ...require('@vality/eslint-config/configs').angular('ngt').overrides,
        ...require('@vality/eslint-config/configs').importOrder(['@ngt/**']).overrides,
    ],
};
