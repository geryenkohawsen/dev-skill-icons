import { useState } from 'react'
import type { Icon } from './icons'

const actionClass =
  'inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-300 px-1 text-center text-[0.8125rem] font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800'

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
    <li className="min-w-0 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="grid grid-cols-2 border-b border-zinc-200 dark:border-zinc-800">
        <div className="grid justify-items-center gap-2 bg-zinc-100 px-3 py-5 text-zinc-700">
          <img src={path} width="56" height="56" alt="" loading="lazy" />
          <span className="text-xs font-medium">Light</span>
        </div>
        <div className="grid justify-items-center gap-2 bg-zinc-950 px-3 py-5 text-zinc-300">
          <img src={path} width="56" height="56" alt="" loading="lazy" />
          <span className="text-xs font-medium">Dark</span>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold tracking-tight">{icon.name}</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{icon.category}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a className={actionClass} href={path} download aria-label={`Download SVG for ${icon.name}`}>
            Download SVG
          </a>
          {copyFormats.map((format) => (
            <button
              key={format}
              type="button"
              className={`${actionClass} cursor-pointer`}
              aria-label={`Copy ${format} for ${icon.name}`}
              onClick={() => void copy(format)}
            >
              Copy {format}
            </button>
          ))}
        </div>
        <p role="status" className="mt-3 min-h-5 text-sm text-zinc-600 dark:text-zinc-400">
          {feedback?.message}
        </p>
        {feedback?.text && (
          <input
            className="mt-2 w-full rounded-md border border-zinc-300 px-2 py-2 font-mono text-xs dark:border-zinc-700"
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
