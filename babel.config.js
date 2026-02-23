module.exports = function (api) {
    api.cache(true);
    let plugins = [];

    // Reanimated includes the worklets plugin internally — only include Reanimated
    // and ensure it is the last plugin in the list
    plugins.push('react-native-reanimated/plugin');

    return {
        presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

        plugins,
    };
};
