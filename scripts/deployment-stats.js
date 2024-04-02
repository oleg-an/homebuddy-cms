// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const env = (varName) => process.env[varName];

const buildNumber = env('BITBUCKET_BUILD_NUMBER');
const repo = env('BITBUCKET_REPO_FULL_NAME');
const pipelineResults = `https://bitbucket.org/${repo}/pipelines/results/${buildNumber}`;

const stats = {
  pipelineResults,
  buildNumber,
  commitHash: env('BITBUCKET_COMMIT'),
  branchName: env('BITBUCKET_BRANCH'),
  destinationBranchName: env('BITBUCKET_PR_DESTINATION_BRANCH'),
  tag: env('BITBUCKET_TAG'),
  prId: env('BITBUCKET_PR_ID'),
  API_BASE_URL: env('API_BASE_URL'),
  REACT_APP_API_BASE_URL: env('REACT_APP_API_BASE_URL'),
  STRIPE_PUB_KEY: env('STRIPE_PUB_KEY'),
  REACT_APP_STRIPE_PUB_KEY: env('REACT_APP_STRIPE_PUB_KEY'),
  SENTRY_DSN: env('SENTRY_DSN'),
  REACT_APP_SENTRY_DSN: env('REACT_APP_SENTRY_DSN'),
};

for (let [key, value] of Object.entries(stats)) {
  if (typeof value !== 'boolean' && !value) {
    delete stats[key];
  }
}

fs.writeFileSync('./build/stats.json', JSON.stringify(stats, null, 2));
