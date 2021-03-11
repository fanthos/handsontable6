const highlight = require('./highlight');
const helpers = require('./helpers');
const examples = require('./examples');

const environmentHead = process.env.BUILD_MODE === 'production' ?
  [
    // Google Tag Manager, an extra element within the `ssr.html` file.
    ['script', {}, `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-55L5D3');
    `],
    // Google Console //todo replace with valid token
    // ['meta', { name: 'google-site-verification', content: 'MZpSOa8SNvFLRRGwUQpYVZ78kIHQoPVdVbafHhJ_d4Q' }]
  ]
  : [];

module.exports = {
  patterns: ['**/*.md', '!README.md'], // to enable vue pages add: '**/*.vue'.
  description: 'Handsontable',
  base: '/docs/',
  head: [
    ['script', { src: '/scripts/handsontable-manager.js' }],
    ...environmentHead
  ],
  markdown: {
    toc: {
      includeLevel: [2,3],
      containerHeaderHtml: '<div class="toc-container-header">Table of contents</div>'
    },
  },
  plugins: [
    ['sitemap', {
      hostname: 'https://handsontable.com'
    }],
    ['@vuepress/active-header-links', {
      sidebarLinkSelector: '.table-of-contents a',
      headerAnchorSelector: '.header-anchor'
    }],
    ['container', examples],
    {
      chainMarkdown (config) {
        // inject custom markdown highlight with our snippet runner
        config
          .options
          .highlight(highlight)
          .end()
      },
    },
    ['@vuepress/search', {
      searchPlaceholder: 'Search...',
      test: helpers.getLatestVersion().replace('.','\\.') // todo make sensible for currentVersion
    }]
  ],
  extendPageData ($page) {
    $page.versions = helpers.getVersions();
    $page.latestVersion = helpers.getLatestVersion();
    $page.currentVersion = helpers.parseVersion($page.path)

    if($page.currentVersion === $page.latestVersion && $page.frontmatter.permalink) {
        $page.frontmatter.permalink = $page.frontmatter.permalink.replace(/^\/[^/]*\//,'/');
    }
  },
  themeConfig: {
    logo: '/logo.png',
    nextLinks: true,
    prevLinks: true,
    repo: 'handsontable/handsontable',
    docsRepo: 'handsontable/handsontable',
    docsDir: 'docs',
    docsBranch: 'develop',
    editLinks: true,
    editLinkText: 'Help us improve this page',
    lastUpdated: true,
    smoothScroll: false,
    nav: [
      { text: 'Demo', link: 'https://handsontable.com/examples' },
      { text: 'Support', items: [
          { text: 'Forum', link: 'https://forum.handsontable.com' },
          { text: 'Report an issue', link: 'https://github.com/handsontable/handsontable/issues/new' },
          { text: 'Contact support', link: 'https://handsontable.com/contact?category=technical_support' },
        ]
      },
    ],
    displayAllHeaders: true, // collapse other pages
    activeHeaderLinks: true,
    sidebarDepth: 0,
    sidebar: helpers.getSidebars()
  }
};
