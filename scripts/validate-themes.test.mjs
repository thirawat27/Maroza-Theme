import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const themesDirectory = path.join(projectRoot, 'themes');
const darkThemeFile = 'Maroza-Dark-Theme.json';
const targetThemeFiles = [
  'Maroza-Light-Theme.json',
  'Maroza-Soothing-Aqua.json',
  'Maroza-Cyber-Chill.json',
  'Maroza-Zen-Pro.json',
];

async function readTheme(fileName) {
  const source = await readFile(path.join(themesDirectory, fileName), 'utf8');
  return { source, theme: JSON.parse(source) };
}

function scopesFor(rule) {
  const values = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
  return values.flatMap((value) => value.split(',').map((scope) => scope.trim()));
}

function tokenColorByScope(theme) {
  const colors = new Map();
  for (const rule of theme.tokenColors) {
    for (const scope of scopesFor(rule)) {
      colors.set(scope, rule.settings?.foreground);
    }
  }
  return colors;
}

function relativeLuminance(hex) {
  assert.match(hex, /^#[0-9a-f]{6}$/i, `Expected an opaque six-digit color, received ${hex}`);
  const channels = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
  const linear = channels.map((channel) => (
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  ));
  return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);
}

function contrastRatio(foreground, background) {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

test('Maroza Dark remains byte-for-byte outside this redesign', async () => {
  const { source } = await readTheme(darkThemeFile);
  const checksum = createHash('sha256').update(source).digest('hex');
  assert.equal(checksum, 'bae670032366be91102419caa2e0b3803328f2cc8ac1f96d823f9e6419c97c04');
});

test('every redesigned theme covers every TextMate scope supported by Maroza Dark', async () => {
  const { theme: darkTheme } = await readTheme(darkThemeFile);
  const requiredScopes = new Set(darkTheme.tokenColors.flatMap(scopesFor));

  for (const fileName of targetThemeFiles) {
    const { theme } = await readTheme(fileName);
    const actualScopes = new Set(theme.tokenColors.flatMap(scopesFor));
    const missingScopes = [...requiredScopes].filter((scope) => !actualScopes.has(scope));
    assert.deepEqual(missingScopes, [], `${fileName} is missing ${missingScopes.length} Dark-compatible scopes`);
  }
});

test('syntax foregrounds remain readable against each editor background', async () => {
  for (const fileName of targetThemeFiles) {
    const { theme } = await readTheme(fileName);
    const background = theme.colors['editor.background'];
    const failures = [];

    for (const rule of theme.tokenColors) {
      const foreground = rule.settings?.foreground;
      if (!foreground) continue;
      const ratio = contrastRatio(foreground, background);
      if (ratio < 4.5) failures.push(`${rule.name}: ${foreground} (${ratio.toFixed(2)}:1)`);
    }

    assert.deepEqual(failures, [], `${fileName} has low-contrast syntax colors:\n${failures.join('\n')}`);
  }
});

test('each redesigned syntax palette has its own identity while retaining Dark roles', async () => {
  const { theme: darkTheme } = await readTheme(darkThemeFile);
  const darkColors = tokenColorByScope(darkTheme);

  for (const fileName of targetThemeFiles) {
    const { theme } = await readTheme(fileName);
    const colors = tokenColorByScope(theme);
    const comparableScopes = [...darkColors.keys()].filter((scope) => colors.has(scope));
    const changedScopes = comparableScopes.filter((scope) => colors.get(scope) !== darkColors.get(scope));
    assert.ok(
      changedScopes.length / comparableScopes.length >= 0.7,
      `${fileName} changes only ${changedScopes.length}/${comparableScopes.length} Dark syntax roles`,
    );
  }
});

test('redesigned themes do not repeat the same token rule', async () => {
  for (const fileName of targetThemeFiles) {
    const { theme } = await readTheme(fileName);
    const signatures = theme.tokenColors.map((rule) => `${rule.name ?? ''}|${scopesFor(rule).join(',')}`);
    const counts = new Map();
    for (const signature of signatures) counts.set(signature, (counts.get(signature) ?? 0) + 1);
    const duplicates = [...counts.entries()]
      .filter(([, count]) => count > 1)
      .map(([signature, count]) => `${signature} x${count}`);
    assert.deepEqual(duplicates, [], `${fileName} repeats ${duplicates.length} token rules`);
  }
});

test('redesigned themes provide Dark-level UI coverage and readable core surfaces', async () => {
  const { theme: darkTheme } = await readTheme(darkThemeFile);
  const requiredUiKeys = Object.keys(darkTheme.colors);
  const foregroundBackgroundPairs = [
    ['editor.foreground', 'editor.background'],
    ['sideBar.foreground', 'sideBar.background'],
    ['activityBar.foreground', 'activityBar.background'],
    ['statusBar.foreground', 'statusBar.background'],
    ['input.foreground', 'input.background'],
    ['editorWidget.foreground', 'editorWidget.background'],
    ['notifications.foreground', 'notifications.background'],
    ['terminal.foreground', 'terminal.background'],
    ['dropdown.foreground', 'dropdown.background'],
  ];

  for (const fileName of targetThemeFiles) {
    const { theme } = await readTheme(fileName);
    const missingKeys = requiredUiKeys.filter((key) => !(key in theme.colors));
    assert.deepEqual(missingKeys, [], `${fileName} is missing ${missingKeys.length} core UI colors`);

    assert.notEqual(theme.colors['editor.background'], theme.colors['sideBar.background'], `${fileName} flattens editor and sidebar surfaces`);
    assert.notEqual(theme.colors['editor.background'], theme.colors['editorWidget.background'], `${fileName} flattens editor and widget surfaces`);

    for (const [foregroundKey, backgroundKey] of foregroundBackgroundPairs) {
      const foreground = theme.colors[foregroundKey];
      const background = theme.colors[backgroundKey];
      const ratio = contrastRatio(foreground, background);
      assert.ok(ratio >= 4.5, `${fileName} ${foregroundKey} is only ${ratio.toFixed(2)}:1 on ${backgroundKey}`);
    }
  }
});
