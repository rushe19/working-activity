/**
 * Japanese copy-pool tests: the ja pools mirror the zh/en shapes, stay clean of
 * Chinese-only glyphs, keep the waiting and thinking pools disjoint (the status
 * line classifies a phrase by pool membership), and are what the pickers draw
 * from when the language is `ja`.
 * @module @deepseek-ai/dsh-working-activity/tests/phrases-ja
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  ACTION_MAP, MODEL_QUIPS, THINKING_TIERS,
  actionFor, compactPhrase, compactRetryPhrase, continuePhrase, donePhrase, failPhrase,
  holidayPhrase, modelQuip, overflowPhrase, rarePhrase, thinkingPhrase, toolOpeningPhrase,
  waitingPhrase, waitingPool, waitingReasonPhrase, weekendPhrase,
} from '../src/phrases.ts'
import * as JA from '../src/phrases.ja.ts'
import { setLangOverride } from '../src/lang.ts'

beforeEach(() => setLangOverride('ja'))
afterEach(() => setLangOverride('auto'))

/** Glyphs that exist only in Simplified Chinese (not shinjitai): a hit means zh copy leaked in. */
const SIMPLIFIED_ONLY = /[这个们说读过还时为样开关动进现应联连级终结检测构编设请览页吗务误错线网络据让么对无选档确认创态显运]/u

/** Every flat pool of the ja module, named for readable failures. */
function flatPools(): [string, readonly string[]][] {
  const pools: [string, readonly string[]][] = []
  for (const [name, value] of Object.entries(JA)) {
    if (Array.isArray(value)) {
      if (value.every(item => typeof item === 'string')) pools.push([name, value as readonly string[]])
      else if (name === 'JA_ACTION_MAP' || name === 'JA_THINKING_TIERS') {
        for (const [i, entry] of (value as { actions?: readonly string[]; pool?: readonly string[] }[]).entries()) {
          pools.push([`${name}[${i}]`, (entry.actions ?? entry.pool) as readonly string[]])
        }
      }
    } else if (value !== null && typeof value === 'object' && !(value instanceof RegExp)) {
      for (const [key, pool] of Object.entries(value as Record<string, readonly string[]>)) {
        if (Array.isArray(pool)) pools.push([`${name}.${key}`, pool])
      }
    }
  }
  return pools
}

describe('ja pool hygiene', () => {
  const pools = flatPools()

  it('covers every pool the module declares', () => {
    // The hygiene checks below only mean something if no export slips past the
    // scan (a new JA_* pool in a shape flatPools() does not know would be skipped).
    const covered = new Set(pools.map(([name]) => name.split(/[.[]/)[0]))
    expect(Object.keys(JA).filter(name => !covered.has(name))).toEqual([])
  })

  it.each(pools)('%s is non-empty, free of blanks and duplicates', (_name, pool) => {
    expect(pool.length).toBeGreaterThan(0)
    expect(pool.every(phrase => phrase.trim() === phrase && phrase.length > 0)).toBe(true)
    expect(new Set(pool).size).toBe(pool.length)
  })

  it.each(pools)('%s carries no Simplified-Chinese-only glyphs', (_name, pool) => {
    for (const phrase of pool) expect(phrase).not.toMatch(SIMPLIFIED_ONLY)
  })

  it('keeps every phrase short enough for the status line', () => {
    for (const [name, pool] of pools) {
      for (const phrase of pool) {
        expect(phrase.length, `${name}: ${phrase}`).toBeLessThanOrEqual(24)
      }
    }
  })
})

describe('ja pools mirror the zh structure', () => {
  it('maps the same tool patterns in the same order as zh', () => {
    expect(JA.JA_ACTION_MAP.map(entry => entry.test.source)).toEqual(ACTION_MAP.map(entry => entry.test.source))
  })

  it('keeps the same long-thinking thresholds', () => {
    expect(JA.JA_THINKING_TIERS.map(tier => tier.atMs)).toEqual(THINKING_TIERS.map(tier => tier.atMs))
  })

  it('keeps the same model-quip keys in the same order (first substring match wins)', () => {
    expect(Object.keys(JA.JA_MODEL_QUIPS)).toEqual(Object.keys(MODEL_QUIPS))
  })

  it('keeps the waiting pool disjoint from the thinking pools', () => {
    // The line classifies a phrase as "still queuing" by waiting-pool membership;
    // an overlap would let a thinking phrase read as latency (and vice versa).
    const thinking = new Set<string>([
      ...JA.JA_THINKING_PHRASES,
      ...JA.JA_THINKING_TIERS.flatMap(tier => [...tier.pool]),
      ...JA.JA_NIGHT_PHRASES,
    ])
    expect(JA.JA_WAITING_PHRASES.filter(phrase => thinking.has(phrase))).toEqual([])
  })
})

describe('the pickers draw ja copy when the language is ja', () => {
  const draws = <T>(fn: () => T, n = 60): Set<T> => new Set(Array.from({ length: n }, fn))
  const thinkingAll = new Set<string>([
    ...JA.JA_THINKING_PHRASES, ...JA.JA_THINKING_TIERS.flatMap(tier => [...tier.pool]), ...JA.JA_NIGHT_PHRASES,
  ])

  it('thinking and waiting phrases come from the ja pools', () => {
    for (const phrase of draws(() => thinkingPhrase(0))) expect(JA.JA_THINKING_PHRASES).toContain(phrase)
    for (const phrase of draws(() => waitingPhrase())) expect(JA.JA_WAITING_PHRASES).toContain(phrase)
    expect(waitingPool()).toBe(JA.JA_WAITING_PHRASES)
  })

  it('long thinking and night mixing stay inside the ja pools', () => {
    for (const phrase of draws(() => thinkingPhrase(45_000))) expect(JA.JA_THINKING_TIERS[0]!.pool).toContain(phrase)
    for (const phrase of draws(() => thinkingPhrase(0, undefined, true), 120)) expect(thinkingAll).toContain(phrase)
  })

  it('tools, failures, completions and openings come from the ja pools', () => {
    for (const phrase of draws(() => actionFor('bash'))) expect(JA.JA_ACTION_MAP[3]!.actions).toContain(phrase)
    for (const phrase of draws(() => actionFor('mystery_tool_xyz'))) expect(JA.JA_FALLBACK_ACTIONS).toContain(phrase)
    for (const phrase of draws(() => failPhrase())) expect(JA.JA_FAIL_PHRASES).toContain(phrase)
    for (const phrase of draws(() => donePhrase())) expect(JA.JA_DONE_PHRASES).toContain(phrase)
    for (const phrase of draws(() => toolOpeningPhrase())) expect(JA.JA_TOOL_OPENING_PHRASES).toContain(phrase)
  })

  it('eggs, interruptions and compaction come from the ja pools', () => {
    for (const phrase of draws(() => rarePhrase())) expect(JA.JA_RARE_PHRASES).toContain(phrase)
    for (const phrase of draws(() => weekendPhrase())) expect(JA.JA_WEEKEND_PHRASES).toContain(phrase)
    for (const phrase of draws(() => continuePhrase())) expect(JA.JA_CONTINUE_PHRASES).toContain(phrase)
    for (const phrase of draws(() => compactPhrase())) expect(JA.JA_COMPACT_PHRASES).toContain(phrase)
    for (const phrase of draws(() => overflowPhrase())) expect(JA.JA_OVERFLOW_PHRASES).toContain(phrase)
    for (const phrase of draws(() => compactRetryPhrase())) expect(JA.JA_COMPACT_RETRY_PHRASES).toContain(phrase)
  })

  it('stall reasons come from the ja pools', () => {
    for (const phrase of draws(() => waitingReasonPhrase('retry'))) expect(JA.JA_RETRY_PHRASES).toContain(phrase)
    for (const phrase of draws(() => waitingReasonPhrase('approval'))) expect(JA.JA_APPROVAL_PHRASES).toContain(phrase)
    for (const phrase of draws(() => waitingReasonPhrase('compaction'))) expect(JA.JA_COMPACTION_START_PHRASES).toContain(phrase)
  })

  it('holiday copy follows the Japanese calendar', () => {
    expect(JA.JA_HOLIDAY_PHRASES['12-25']).toContain(holidayPhrase(new Date(2026, 11, 25))!)
    expect(JA.JA_HOLIDAY_PHRASES['05-05']).toContain(holidayPhrase(new Date(2026, 4, 5))!)
    // The zh-only Children's Day (6/1) has no ja entry.
    expect(holidayPhrase(new Date(2026, 5, 1))).toBeNull()
    // A Lunar New Year day draws the ja Lunar pool.
    expect(JA.JA_LUNAR_NEW_YEAR_PHRASES).toContain(holidayPhrase(new Date(2026, 1, 17))!)
  })

  it('model quips come from the ja table and still match by substring', () => {
    expect(JA.JA_MODEL_QUIPS.deepseek).toContain(modelQuip('deepseek-chat')!)
    expect(JA.JA_MODEL_QUIPS.claude).toContain(modelQuip('claude-sonnet-4')!)
    expect(modelQuip('totally-unknown')).toBeNull()
  })

  it('keeps user custom pools verbatim', () => {
    expect(actionFor('my_deploy', { my_deploy: ['デプロイする'] })).toBe('デプロイする')
  })

  it('never leaks Chinese-only copy while thinking in ja', () => {
    for (const phrase of draws(() => thinkingPhrase(0), 200)) expect(phrase).not.toMatch(SIMPLIFIED_ONLY)
  })
})
