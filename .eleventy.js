const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  // Let Eleventy read .yml / .yaml data files (Decap writes YAML)
  eleventyConfig.addDataExtension("yml,yaml", (contents) => yaml.load(contents));

  // Copy static assets straight through to the built site
  eleventyConfig.addPassthroughCopy({
    "src/images": "images",
    "src/css": "css",
    "src/admin": "admin",
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
