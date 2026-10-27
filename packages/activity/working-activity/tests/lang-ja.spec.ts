/**
 * Japanese structural-copy tests: `lang.ja.ts` carries every dictionary key with
 * matching placeholders, `t()` resolves it, and the language chain recognises
 * `ja` (env var, OS locale, plugin pin) instead of falling through to zh.
 * @module @deepseek-ai/dsh-working-activity/tests/lang-ja
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { detectLocaleLang, isLang, langNow, setLangOverride, t, type I18nKey } from '../src/lang.ts'
import { JA_TEXT } from '../src/lang.ja.ts'

/** The dictionary keys declared in lang.ts (the dictionary itself is module-private). */
const KEYS = [...readFileSync(fileURLToPath(new URL('../src/lang.ts', import.meta.url)), 'utf8')
  .matchAll(/^ {2}'([a-z][a-z-]*)': \{/gm)].map(match => match[1]!) as I18nKey[]

/** Glyphs that exist only in Simplified Chinese (not shinjitai): a hit means zh copy leaked in. */
const SIMPLIFIED_ONLY = /[这个们说读过还时为样开关动进现应联连级终结检测构编设请览页吗务误错线网络据让么对无选档确认创态显运总]/u

const placeholders = (text: string): string[] => [...text.matchAll(/\{\{(\w+)\}\}/g)].map(match => match[1]!).sort()

const ENV_KEYS = ['DSH_TUI_LANG', 'LC_ALL', 'LC_MESSAGES', 'LANG'] as const
const saved: Partial<Record<(typeof ENV_KEYS)[number], string | undefined>> = {}

beforeEach(() => {
  for (const key of ENV_KEYS) {
    saved[key] = process.env[key]
    delete process.env[key]
  }
  setLangOverride('auto')
})

afterEach(() => {
  for (const key of ENV_KEYS) {
    if (saved[key] === undefined) delete process.env[key]
    else process.env[key] = saved[key]
  }
  setLangOverride('auto')
})

describe('lang.ja.ts', () => {
  it('found the dictionary keys (guards the source scan)', () => {
    expect(KEYS.length).toBeGreaterThanOrEqual(12)
    expect(KEYS).toContain('narrate-instruction')
  })

  it('carries exactly the dictionary keys', () => {
    expect(Object.keys(JA_TEXT).sort()).toEqual([...KEYS].sort())
  })

  it('keeps the placeholders of the English entry for every key', () => {
    for (const key of KEYS) {
      setLangOverride('en')
      const en = t(key)
      setLangOverride('ja')
      expect(placeholders(t(key)), key).toEqual(placeholders(en))
    }
  })

  it('translates every key (no English or Chinese leftovers)', () => {
    for (const key of KEYS) {
      setLangOverride('en')
      const en = t(key)
      setLangOverride('ja')
      const text = t(key)
      expect(text, key).not.toBe(key)
      expect(text, key).not.toBe(en)
      // Kanji-only terms (思考中) are valid Japanese, so check for zh-only glyphs
      // rather than demanding kana.
      expect(text, key).not.toMatch(SIMPLIFIED_ONLY)
    }
  })

  it('narrates in the ⏵ contract shape', () => {
    setLangOverride('ja')
    const text = t('narrate-instruction')
    expect(text).toContain('⏵')
    expect(text).not.toMatch(/状态栏|必须/)
  })

  it('formats the structural line pieces', () => {
    setLangOverride('ja')
    expect(t('line-elapsed', { elapsed: '5s' })).toBe('合計 5s')
    expect(t('thinking-label')).toBe('思考中')
    expect(t('tool-count-many', { count: 3 })).toBe('3 ツール')
  })
})

describe('language resolution knows ja', () => {
  it('accepts ja as a shipped language code', () => {
    expect(isLang('ja')).toBe(true)
    expect(isLang('fr')).toBe(false)
  })

  it('honours a plugin-level ja pin', () => {
    setLangOverride('ja')
    expect(langNow()).toBe('ja')
  })

  it('honours DSH_TUI_LANG=ja (it used to fall through to zh)', () => {
    process.env.DSH_TUI_LANG = 'ja'
    expect(langNow()).toBe('ja')
    expect(t('thinking-label')).toBe('思考中')
  })

  it('maps a Japanese OS locale to ja', () => {
    process.env.LANG = 'ja_JP.UTF-8'
    expect(detectLocaleLang()).toBe('ja')
    process.env.LC_ALL = 'JA_JP'
    expect(detectLocaleLang()).toBe('ja')
  })

  it('keeps the existing locale mapping', () => {
    process.env.LANG = 'zh_CN.UTF-8'
    expect(detectLocaleLang()).toBe('zh')
    process.env.LANG = 'en_US.UTF-8'
    expect(detectLocaleLang()).toBe('en')
    process.env.LANG = 'C'
    expect(detectLocaleLang()).toBe('en')
  })
})
