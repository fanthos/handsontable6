import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Octokit } from '@octokit/rest';
import semver from 'semver';
import utils from './utils.js';

const { logger } = utils;
const docsBasePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const MIN_DOCS_VERSION = '4.0.0';
const TARGET_PATH = path.resolve('./.vuepress/public/scripts/hot-versions.js');
const relativeTarget = path.relative(docsBasePath, TARGET_PATH);

const fileContentFactory = docsVersions => `
// --- THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY!!! ---
(function() {
  docVersions && docVersions(${JSON.stringify(docsVersions)});
}());
`;

const octokit = new Octokit();
let releases = [];

(async() => {
  try {
    releases = await octokit.rest.repos
      .listReleases({
        owner: 'handsontable',
        repo: 'handsontable',
        per_page: 50,
      });

    if (releases.status !== 200) {
      throw new Error('Incorrect response from the GitHub API.');
    }

    logger.log(`GitHub API rate limits:
    Limit: ${releases.headers['x-ratelimit-limit']}
    Used: ${releases.headers['x-ratelimit-used']}
    Remaining: ${releases.headers['x-ratelimit-remaining']}
  `);

  } catch (ex) {
    logger.error('Something bad happened while fetching the releases:', ex.message);
    process.exit(1);
  }

  const releaseVersions = releases.data
    .map(release => release.tag_name)
    .filter(tagName => semver.prerelease(tagName) === null && semver.gte(tagName, MIN_DOCS_VERSION))
    .sort(semver.rcompare);

  try {
    fs.writeFileSync(TARGET_PATH, fileContentFactory(releaseVersions));
  } catch (ex) {
    logger.error('Something bad happened while writing the file:', ex.message);
    process.exit(1);

  } finally {
    logger.success(`The file with generated versions for legacy docs is created at "${relativeTarget}"`);
  }
})();
