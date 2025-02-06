module.exports = {
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        os: require.resolve('os-browserify/browser'),
      };
      return config;
    },
  };
  