module.exports = {
    extends: '@vality/eslint-config-ng',
    overrides: [
        ...require('@vality/eslint-config-ng/configs').angular('ngt').overrides,
        ...require('@vality/eslint-config-ng/configs').importOrder(['@ngt/**']).overrides,
    ],
};
