import { useState } from 'react'
import type { Icon } from './icons'

const actionClass =
  'inline-grid size-11 place-items-center rounded-md border border-control hover:bg-hover'

const actionPaths = {
  Download: 'M12 3v12m-4-4 4 4 4-4M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4',
  URL: 'M10 13a4 4 0 0 0 5.7 0l3.3-3.3a4 4 0 1 0-5.7-5.7l-1.4 1.4m2.1 5.6a4 4 0 0 0-5.7 0L5 14.3a4 4 0 1 0 5.7 5.7l1.4-1.4',
  HTML: 'm7 7-5 5 5 5m10-10 5 5-5 5M14 5l-4 14',
  Markdown: 'M3 18V6h18v12H3Zm3-3V9l3 3 3-3v6m5-6v6m-2-2 2 2 2-2',
}

function ActionIcon({ action }: { action: keyof typeof actionPaths }) {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={actionPaths[action]} />
    </svg>
  )
}

const copyFormats = ['URL', 'HTML', 'Markdown'] as const

export function IconCard({ icon }: { icon: Icon }) {
  const [feedback, setFeedback] = useState<{ message: string; text?: string }>()
  const path = `/icons/${icon.slug}.svg`

  async function copy(format: (typeof copyFormats)[number]) {
    const home = new URL('/', window.location.origin).href
    const url = new URL(path, home).href
    const htmlName = icon.name.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    const markdownName = icon.name.replace(/[[\]\\]/g, '\\$&')
    const text = {
      URL: url,
      HTML: `<a href="${home}"><img src="${url}" alt="${htmlName}" /></a>`,
      Markdown: `[![${markdownName}](${url})](${home})`,
    }[format]

    try {
      await navigator.clipboard.writeText(text)
      setFeedback({ message: `${format} copied.` })
    } catch {
      setFeedback({ message: `Couldn’t copy ${format}. Select and copy the text below.`, text })
    }
  }

  return (
    <li className="min-w-0 overflow-hidden rounded-xl border border-line bg-white">
      <div className={`grid divide-x divide-line border-b border-line text-muted ${icon.hasLight ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {icon.hasLight && (
          <div className="grid justify-items-center gap-2 px-3 py-5">
            <img src={`/icons/${icon.slug}-light.svg`} width="56" height="56" alt="" loading="lazy" />
            <span className="text-xs font-medium">Light</span>
          </div>
        )}
        <div className="grid justify-items-center gap-2 px-3 py-5">
          <img src={path} width="56" height="56" alt="" loading="lazy" />
          <span className="text-xs font-medium">{icon.hasLight ? 'Dark' : 'Default'}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold tracking-tight">{icon.name}</h3>
        <p className="mt-1 text-sm text-muted">{icon.category}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a className={actionClass} href={path} download aria-label={`Download SVG for ${icon.name}`} title="Download SVG">
            <ActionIcon action="Download" />
          </a>
          {copyFormats.map((format) => (
            <button
              key={format}
              type="button"
              className={`${actionClass} cursor-pointer`}
              aria-label={`Copy ${format} for ${icon.name}`}
              title={`Copy ${format}`}
              onClick={() => void copy(format)}
            >
              <ActionIcon action={format} />
            </button>
          ))}
        </div>
        <p role="status" className="mt-3 min-h-5 text-sm text-muted">
          {feedback?.message}
        </p>
        {feedback?.text && (
          <input
            className="mt-2 w-full rounded-md border border-control px-2 py-2 font-mono text-xs"
            aria-label={`Copyable text for ${icon.name}`}
            value={feedback.text}
            readOnly
            onFocus={(event) => event.currentTarget.select()}
          />
        )}
      </div>
    </li>
  )
}
