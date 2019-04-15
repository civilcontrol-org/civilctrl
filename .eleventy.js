const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const htmlMinifier = require('html-minifier')

module.exports = function(config) {
    config.addPlugin(syntaxHighlight)

    config.addLayoutAlias('base', 'base.njk')
    config.addLayoutAlias('home', 'home.njk')
    config.addLayoutAlias('page', 'page.njk')

    config.addPassthroughCopy('src/assets/images')

    config.addTransform('htmlmin', function(content, outputPath) {
        if (outputPath.endsWith('.html')) {
            return htmlMinifier.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            })
        }
        return content
    })

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            layouts: 'layouts',
            data: 'data'
        },
        templateFormats: ['njk', 'md', 'css'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        passthroughFileCopy: true
    }
}
