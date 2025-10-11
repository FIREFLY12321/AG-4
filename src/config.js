const core = require('@actions/core');
const {
    processIgnoreEvents,
    processEventLimit,
    processStyle,
    processBooleanInput,
    processEventEmojiMap,
} = require('./utils/config-helpers');

// Load inputs from GitHub Actions
module.exports = {
    username: core.getInput('GITHUB_USERNAME', { required: true }),
    token: core.getInput('GITHUB_TOKEN', { required: true }),
    eventLimit: processEventLimit(core.getInput('EVENT_LIMIT')),
    style: processStyle(core.getInput('OUTPUT_STYLE')),
    ignoreEvents: processIgnoreEvents(core.getInput('IGNORE_EVENTS')),
    hideDetailsOnPrivateRepos: processBooleanInput(core.getInput('HIDE_DETAILS_ON_PRIVATE_REPOS'), 'HIDE_DETAILS_ON_PRIVATE_REPOS'),
    readmePath: core.getInput('README_PATH'),
    commitMessage: core.getInput('COMMIT_MESSAGE'),
    eventEmojiMap: processEventEmojiMap(core.getInput('EVENT_EMOJI_MAP')),
    dryRun: processBooleanInput(core.getInput('DRY_RUN'), 'DRY_RUN')
};
