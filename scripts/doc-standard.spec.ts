/**
 * Quick comprehensive documentation-standard tests: the consolidated `doc`
 * skill carries no stale copied website values or prototype-era language, the
 * controlled-English discipline stays linked, and the kind system maps each
 * label to exactly one skill template. These run in `pnpm run test` and
 * `pnpm run test:docs` to guard the standard between heavier corpus gates.
 * @module scripts/doc-standard.spec
 */

import { existsSync, globSync, readFileSync } from 'node:fs'
import { resolve, sep } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '..')

/**
 * The kind system: each label maps to exactly one template in the doc
 * skill. The check derives the template set from the skill directory itself;
 * a kind without a template or a template without a kind fails here.
 */
const KIND_TEMPLATES: Readonly<Record<string, string>> = {
  'package-group': '.agents/skills/doc/templates/package-group.md',
  'package-reference': '.agents/skills/doc/templates/package-reference.md',
  'package-library': '.agents/skills/doc/templates/package-library.md',
  'package-bundle': '.agents/skills/doc/templates/package-bundle.md',
  'persistence-change': '.agents/skills/doc/templates/persistence-change.md',
  'persistence-release': '.agents/skills/doc/templates/persistence-release.md',
  'persistence-format': '.agents/skills/doc/templates/persistence-format.md',
  'upgrade-guide': '.agents/skills/doc/templates/upgrade-guide.md',
}

describe('doc skill consolidation', () => {
  it('carries no prototype-era language', () => {
    const files = [
      '.agents/skills/doc/SKILL.md',
      '.agents/skills/doc/references/metadata-links-i18n.md',
      '.agents/skills/doc/references/structure-hierarchy.md',
      '.agents/skills/doc/references/style.md',
      '.agents/skills/doc/references/review.md',
      '.agents/skills/doc/references/website-sync.md',
    ]
    for (const file of files) {
      const source = readFileSync(resolve(root, file), 'utf8')
      expect(source, file).not.toMatch(/\bprototype\b/i)
    }
  })

  it('copies no stale website sidebar or section-owner values', () => {
    const source = readFileSync(resolve(root, '.agents/skills/doc/references/website-sync.md'), 'utf8')
    expect(source).not.toContain('en-docs')
    expect(source).not.toContain('sectionOrder')
  })

  it('keeps the reference example linked from the skill', () => {
    const skill = readFileSync(resolve(root, '.agents/skills/doc/SKILL.md'), 'utf8')
    expect(skill).toContain('session-persistence-jsonl/README.md')
    expect(skill).toContain('session-persistence-jsonl/README.zh.md')
  })

  it('defines controlled English as a precision-preserving review discipline', () => {
    const skill = readFileSync(resolve(root, '.agents/skills/doc/SKILL.md'), 'utf8')
    const style = readFileSync(resolve(root, '.agents/skills/doc/references/style.md'), 'utf8')
    expect(skill).toContain('references/style.md#controlled-technical-english')
    expect(style).toContain('not certified ASD-STE100 compliance')
    expect(style).toContain('review prompts, not mechanical gates')
    expect(style).toContain('Never remove or strengthen `must`, `may`, `never`')
  })

  it('maps every kind label to exactly one skill template that exists', () => {
    const templateFiles = globSync('.agents/skills/doc/templates/*.md', { cwd: root }).map(path => path.split(sep).join('/')).sort()
    const registered = Object.values(KIND_TEMPLATES).sort()
    expect(templateFiles).toEqual(registered)
    for (const [kind, template] of Object.entries(KIND_TEMPLATES)) {
      expect(existsSync(resolve(root, template)), `${kind}: template ${template}`).toBe(true)
    }
  })
})
