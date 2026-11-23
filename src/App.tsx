import { useEffect, useRef, useState } from 'react'
import { IconCard } from './IconCard'
import { icons } from './icons'

const categories = [...new Set(icons.map((icon) => icon.category))].sort()
const fieldClass =
  'min-h-11 w-full rounded-lg border border-control bg-white px-3 text-base placeholder:text-muted'

function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [filtersHidden, setFiltersHidden] = useState(false)
  const [toast, setToast] = useState('')
  const lastToast = useRef('')
  const resultsSummary = useRef<HTMLParagraphElement>(null)
  const searchInput = useRef<HTMLInputElement>(null)
  const terms = query.trim().toLowerCase().split(/\s+/)
  const results = icons.filter((icon) => {
    const searchable = [icon.name, icon.slug, icon.category, ...(icon.aliases ?? [])].join(' ').toLowerCase()
    return (!category || category === icon.category) && terms.every((term) => searchable.includes(term))
  })

  function showToast(message: string) {
    // Keep identical actions announceable in the same live region.
    const announcement = lastToast.current === message ? `${message}\u00a0` : message
    lastToast.current = announcement
    setToast(announcement)
  }

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(''), 4000)
    return () => window.clearTimeout(timeout)
  }, [toast])

  useEffect(() => {
    let previousY = Math.max(0, window.scrollY)

    function updateFilters() {
      const currentY = Math.max(0, window.scrollY)
      const distance = currentY - previousY
      if (Math.abs(distance) < 4) return
      previousY = currentY
      // The summary stays in flow and marks the space the sticky bar still occupies.
      const summaryTop = resultsSummary.current?.getBoundingClientRect().top ?? 1
      setFiltersHidden(distance > 0 && summaryTop <= 0)
    }

    function resetFilters() {
      previousY = Math.max(0, window.scrollY)
      setFiltersHidden(false)
    }

    window.addEventListener('scroll', updateFilters, { passive: true })
    window.addEventListener('resize', resetFilters)
    return () => {
      window.removeEventListener('scroll', updateFilters)
      window.removeEventListener('resize', resetFilters)
    }
  }, [])

  return (
    <main>
      <header className="border-b border-line bg-hero">
        <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-14 text-center sm:px-8 sm:pt-24 sm:pb-20 lg:px-12">
          <a
            className="group absolute top-5 right-5 grid size-11 place-items-center rounded-full sm:right-8 lg:right-12"
            href="https://github.com/geryenkohawsen/dev-skill-icons"
            aria-label="View Dev Skill Icons on GitHub"
          >
            <img
              src="/github.svg"
              width="22"
              height="22"
              alt=""
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6"
            />
          </a>
          <h1 className="font-serif text-4xl leading-none tracking-tight sm:text-7xl">Dev Skill Icons</h1>
          <p className="mx-auto mt-5 max-w-md text-base text-muted sm:text-lg">
            Community-maintained SVG icons for developer portfolios and GitHub READMEs.
          </p>
        </div>
      </header>

      <section aria-labelledby="gallery" className="mx-auto max-w-7xl px-5 pt-9 pb-16 sm:px-8 sm:pt-12 lg:px-12">
        <h2 id="gallery" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Icon gallery
        </h2>

        <div className="pointer-events-none sticky top-0 z-10 mt-2 -mx-2">
          <div
            role="search"
            aria-label="Icon gallery"
            data-hidden={filtersHidden || undefined}
            className="gallery-filters pointer-events-auto grid gap-4 bg-white px-2 py-3 sm:grid-cols-[1fr_14rem]"
          >
            <div>
              <label htmlFor="icon-search" className="mb-2 block text-sm font-medium">Search icons</label>
              <input
                id="icon-search"
                ref={searchInput}
                type="search"
                className={fieldClass}
                placeholder="Try React, Python, or Docker"
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
              />
            </div>
            <div>
              <label htmlFor="icon-category" className="mb-2 block text-sm font-medium">Category</label>
              <div className="relative">
                <select
                  id="icon-category"
                  className={`${fieldClass} appearance-none pr-10 forced-colors:appearance-auto`}
                  value={category}
                  onChange={(event) => setCategory(event.currentTarget.value)}
                >
                  <option value="">All categories</option>
                  {categories.map((name) => <option key={name}>{name}</option>)}
                </select>
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-muted forced-colors:hidden"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <p ref={resultsSummary} role="status" className="mt-3 mb-3 text-sm tabular-nums text-muted">
          {results.length} of {icons.length} icons
        </p>
        {results.length > 0 ? (
          <ul role="list" aria-label="Icons" className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((icon) => <IconCard key={icon.slug} icon={icon} onAction={showToast} />)}
          </ul>
        ) : (
          <div className="rounded-xl border border-line bg-white p-6">
            <h3 className="text-lg font-semibold">No matching icons</h3>
            <p className="mt-1 text-sm text-muted">Try a different search or category.</p>
            <button
              type="button"
              className="mt-2 min-h-11 cursor-pointer text-sm font-medium underline underline-offset-4"
              onClick={() => {
                setQuery('')
                setCategory('')
                searchInput.current?.focus()
              }}
            >
              Clear filters
            </button>
          </div>
        )}
        <p className="mt-8 text-sm text-muted">
          Icons from <a className="underline underline-offset-4" href="https://github.com/tandpfun/skill-icons">Skill Icons</a>
          {' · '}
          <a className="underline underline-offset-4" href="/skill-icons-license.txt">MIT license</a>
        </p>
      </section>

      <div role="status" className="pointer-events-none fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-20 flex justify-center">
        {toast && <p className="max-w-sm rounded-lg bg-ink px-4 py-3 text-sm font-medium text-white shadow-md">{toast}</p>}
      </div>
    </main>
  )
}

export default App
