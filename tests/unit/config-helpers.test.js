const test = require('node:test');
const assert = require('node:assert/strict');
const {
    processIgnoreEvents,
    processEventLimit,
    processStyle,
    processBooleanInput,
    processEventEmojiMap,
} = require('../../src/utils/config-helpers');
const core = require('@actions/core');

test('processIgnoreEvents 正確解析事件清單', () => {
    const result = processIgnoreEvents('[PushEvent, IssuesEvent, ReleaseEvent]');
    assert.deepEqual(result, ['PushEvent', 'IssuesEvent', 'ReleaseEvent']);
});

test('processEventLimit 會轉換為整數', () => {
    assert.equal(processEventLimit('5'), 5);
});

test('processStyle 僅接受 Markdown 與 HTML', () => {
    assert.equal(processStyle('markdown'), 'markdown');
    assert.equal(processStyle('HTML'), 'HTML');
});

test('processBooleanInput 解析布林值與預設', () => {
    assert.equal(processBooleanInput('true', 'DRY_RUN'), true);
    assert.equal(processBooleanInput('FALSE', 'DRY_RUN'), false);
    assert.equal(processBooleanInput('', 'DRY_RUN'), false);
    assert.equal(processBooleanInput(undefined, 'DRY_RUN'), false);
});

test('processEventEmojiMap 可覆蓋部分設定', () => {
    const originalNotice = core.notice;
    const notices = [];
    core.notice = (message) => notices.push(message);

    const map = processEventEmojiMap(`
      PushEvent: "🚀"
      PullRequestEvent:
        opened: "🛠️"
    `);

    assert.equal(map.PushEvent, '🚀');
    assert.equal(map.PullRequestEvent.opened, '🛠️');
    assert.ok(
        notices.some((message) => message.includes('Using event emoji map')),
        '應該記錄使用的 emoji map'
    );

    core.notice = originalNotice;
});
