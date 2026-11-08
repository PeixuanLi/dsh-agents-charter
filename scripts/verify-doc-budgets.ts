/**
 * Enforce `wc -w`-style ceilings from `scripts/doc-budgets.manifest.json`.
 * A budget fails when its document exceeds the ceiling or when the ceiling
 * leaves under 5% headroom over the current word count; missing files and
 * invalid ceilings fail; `--list` reports current usage. Only listed standing
 * docs are budgeted. Ceilings ratchet down; raising one requires the
 * justification defined in `docs/AGENTS.md`.
 */

import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')

const MANIFEST_PATH = resolve(root, 'scripts/doc-budgets.manifest.json')

/** Budgets keep at least this much headroom over the current word count. */
const HEADROOM_FACTOR = 1.05

/** Absorbs binary representation error in `words * HEADROOM_FACTOR` comparisons. */
const HEADROOM_EPSILON = 1e-9

/** `--list` status column width; every marker pads to it so count columns align. */
const STATUS_WIDTH = 6

/** Render one `--list` row with fixed-width status, word-count, and ceiling columns. */
function formatRow(status: string, words: string, ceiling: string, path: string): string {
  return `${status.padEnd(STATUS_WIDTH)}${words.padStart(6)} / ${ceiling.padEnd(6)} ${path}`
}

/**
 * `wc -w` equivalent: count whitespace-delimited tokens.
 * @param text - document text to measure.
 * @returns the number of whitespace-delimited tokens.
 */
export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

/** Budget evaluation over a manifest: display rows and gate failures. */
export interface DocBudgetReport {
  /** One `--list` display row per manifest entry, in manifest order. */
  rows: string[]
  /** One failure message per violated budget; empty when every budget passes. */
  failures: string[]
}

/**
 * Evaluate every manifest entry against its budgeted document.
 * @param manifest - budgeted repository-relative path to word ceiling.
 * @param readBudgeted - returns document text, or undefined when the path is absent.
 * @returns one display row per entry and one failure per violated budget.
 */
export function evaluateDocBudgets(
  manifest: Record<string, number>,
  readBudgeted: (path: string) => string | undefined,
): DocBudgetReport {
  const rows: string[] = []
  const failures: string[] = []

  for (const [path, ceiling] of Object.entries(manifest)) {
    if (!Number.isInteger(ceiling) || ceiling <= 0) {
      rows.push(formatRow('BAD', '—', String(ceiling), path))
      failures.push(`${path}: ceiling must be a positive integer, got ${ceiling}`)
      continue
    }
    const text = readBudgeted(path)
    if (text === undefined) {
      rows.push(formatRow('MISS', '—', String(ceiling), path))
      failures.push(`${path}: budgeted file does not exist (renamed or deleted? update scripts/doc-budgets.manifest.json in the same change)`)
      continue
    }
    const words = countWords(text)
    const minimum = Math.ceil(words * HEADROOM_FACTOR)
    const withinCeiling = words <= ceiling
    const hasHeadroom = ceiling + HEADROOM_EPSILON >= words * HEADROOM_FACTOR
    rows.push(formatRow(!withinCeiling ? 'OVER' : hasHeadroom ? 'ok' : 'TIGHT', String(words), String(ceiling), path))
    if (!withinCeiling) {
      failures.push(`${path}: ${words} words exceeds the ${ceiling}-word ceiling — relocate or condense per docs/AGENTS.md (raising the ceiling requires justification in the PR)`)
    } else if (!hasHeadroom) {
      failures.push(`${path}: ${ceiling}-word ceiling leaves under 5% headroom at ${words} words (minimum ${minimum}) — raise the ceiling to the justified budget per docs/AGENTS.md`)
    }
  }

  return { rows, failures }
}

const invokedPath = process.argv[1]
const isMain = invokedPath !== undefined && import.meta.url === pathToFileURL(resolve(invokedPath)).href
if (isMain) {
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as Record<string, number>
  const report = evaluateDocBudgets(manifest, (path) => {
    const abs = resolve(root, path)
    return existsSync(abs) ? readFileSync(abs, 'utf8') : undefined
  })

  if (process.argv.includes('--list')) {
    console.log(report.rows.join('\n'))
    process.exit(0)
  }

  if (report.failures.length > 0) {
    console.error('verify-doc-budgets failed:\n')
    for (const failure of report.failures) console.error(`  ${failure}`)
    console.error('\nSee docs/AGENTS.md for the documentation standard and the relocation-first rule.')
    process.exit(1)
  }

  console.log(`verify-doc-budgets: ${Object.keys(manifest).length} budgeted docs within ceiling with 5% headroom.`)
}
