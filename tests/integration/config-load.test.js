const test = require('node:test');
const assert = require('node:assert/strict');

test('config 模組能夠讀取 GitHub Actions 輸入並整合', async () => {
    // 準備模擬的 GitHub Actions 輸入環境變數
    process.env.INPUT_GITHUB_USERNAME = 'octocat';
    process.env.INPUT_GITHUB_TOKEN = 'ghs_mock_token';
    process.env.INPUT_EVENT_LIMIT = '10';
    process.env.INPUT_OUTPUT_STYLE = 'markdown';
    process.env.INPUT_IGNORE_EVENTS = '[PushEvent, IssuesEvent]';
    process.env.INPUT_HIDE_DETAILS_ON_PRIVATE_REPOS = 'true';
    process.env.INPUT_README_PATH = 'README.md';
    process.env.INPUT_COMMIT_MESSAGE = 'chore: update activity log';
    process.env.INPUT_EVENT_EMOJI_MAP = '';
    process.env.INPUT_DRY_RUN = 'false';

    // 重新載入模組以套用新的環境設定
    delete require.cache[require.resolve('../../src/config')];
    const config = require('../../src/config');

    assert.equal(config.username, 'octocat');
    assert.equal(config.token, 'ghs_mock_token');
    assert.equal(config.eventLimit, 10);
    assert.equal(config.style, 'markdown');
    assert.deepEqual(config.ignoreEvents, ['PushEvent', 'IssuesEvent']);
    assert.equal(config.hideDetailsOnPrivateRepos, true);
    assert.equal(config.readmePath, 'README.md');
    assert.equal(config.commitMessage, 'chore: update activity log');
    assert.equal(typeof config.eventEmojiMap, 'object');
    assert.equal(config.dryRun, false);

    // 還原環境，避免汙染其他測試
    [
        'INPUT_GITHUB_USERNAME',
        'INPUT_GITHUB_TOKEN',
        'INPUT_EVENT_LIMIT',
        'INPUT_OUTPUT_STYLE',
        'INPUT_IGNORE_EVENTS',
        'INPUT_HIDE_DETAILS_ON_PRIVATE_REPOS',
        'INPUT_README_PATH',
        'INPUT_COMMIT_MESSAGE',
        'INPUT_EVENT_EMOJI_MAP',
        'INPUT_DRY_RUN',
    ].forEach((key) => delete process.env[key]);
});
