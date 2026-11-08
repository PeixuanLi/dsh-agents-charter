import { describe, expect, it } from 'vitest'
import { countWords, evaluateDocBudgets } from './verify-doc-budgets.ts'

/** Fabricate a document of exactly `words` whitespace-delimited tokens. */
function documentOf(words: number): string {
  return Array.from({ length: words }, () => 'word').join(' ')
}

/** Evaluate budgets over an in-memory corpus; absent paths are missing files. */
function evaluate(files: Record<string, string>, manifest: Record<string, number>) {
  return evaluateDocBudgets(manifest, path => files[path])
}

describe('documentation budget evaluation', () => {
  it('counts whitespace-delimited tokens like wc -w', () => {
    expect(countWords('one two  three\n\nfour\tfive ')).toBe(5)
    expect(countWords('')).toBe(0)
  })

  it('accepts a document within ceiling with at least 5% headroom', () => {
    const report = evaluate({ 'docs/guide.md': documentOf(100) }, { 'docs/guide.md': 120 })
    expect(report.failures).toEqual([])
    expect(report.rows).toEqual(['ok       100 / 120    docs/guide.md'])
  })

  it('accepts a ceiling at exactly 5% headroom', () => {
    const report = evaluate({ 'docs/guide.md': documentOf(100) }, { 'docs/guide.md': 105 })
    expect(report.failures).toEqual([])
    expect(report.rows).toEqual(['ok       100 / 105    docs/guide.md'])
  })

  it('fails a within-ceiling budget that leaves under 5% headroom', () => {
    const report = evaluate({ 'docs/guide.md': documentOf(100) }, { 'docs/guide.md': 103 })
    expect(report.failures).toEqual([
      'docs/guide.md: 103-word ceiling leaves under 5% headroom at 100 words (minimum 105) — raise the ceiling to the justified budget per docs/AGENTS.md',
    ])
    expect(report.rows).toEqual(['TIGHT    100 / 103    docs/guide.md'])
  })

  it('fails an over-ceiling document with the relocation-first message alone', () => {
    const report = evaluate({ 'docs/guide.md': documentOf(100) }, { 'docs/guide.md': 90 })
    expect(report.failures).toEqual([
      'docs/guide.md: 100 words exceeds the 90-word ceiling — relocate or condense per docs/AGENTS.md (raising the ceiling requires justification in the PR)',
    ])
    expect(report.rows).toEqual(['OVER     100 / 90     docs/guide.md'])
  })

  it('fails a missing budgeted file', () => {
    const report = evaluate({}, { 'docs/gone.md': 100 })
    expect(report.failures).toEqual([
      'docs/gone.md: budgeted file does not exist (renamed or deleted? update scripts/doc-budgets.manifest.json in the same change)',
    ])
    expect(report.rows).toEqual(['MISS       — / 100    docs/gone.md'])
  })

  it.each([0, -10, 12.5])('fails a non-positive or non-integer ceiling %s', (ceiling) => {
    const report = evaluate({ 'docs/guide.md': documentOf(100) }, { 'docs/guide.md': ceiling })
    expect(report.failures).toEqual([
      `docs/guide.md: ceiling must be a positive integer, got ${ceiling}`,
    ])
    expect(report.rows).toEqual([`BAD        — / ${String(ceiling).padEnd(6)} docs/guide.md`])
  })
})
