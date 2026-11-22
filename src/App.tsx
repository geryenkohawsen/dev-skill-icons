import { useRef, useState } from 'react'
import { IconCard } from './IconCard'
import { icons } from './icons'

const categories = [...new Set(icons.map((icon) => icon.category))].sort()
const fieldClass =
  'min-h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base dark:border-zinc-700 dark:bg-zinc-900'

function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const searchInput = useRef<HTMLInputElement>(null)
  const terms = query.trim().toLowerCase().split(/\s+/)
  const results = icons.filter((icon) => {
    const searchable = [icon.name, icon.slug, icon.category, ...icon.aliases].join(' ').toLowerCase()
    return (!category || category === icon.category) && terms.every((term) => searchable.includes(term))
  })

  return (
    <main className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-12">
      <header className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4 border-b border-zinc-200 pt-12 pb-8 sm:pt-20 sm:pb-10 dark:border-zinc-800">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Dev Skill Icons</h1>
          <p className="mt-4 max-w-lg text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            A community-maintained SVG icon library for developers.
          </p>
        </div>
        <a
          className="inline-flex min-h-11 items-center font-medium underline underline-offset-4 hover:text-teal-800 dark:hover:text-teal-300"
          href="https://github.com/geryenkohawsen/dev-skill-icons"
        >
          View on GitHub
        </a>
      </header>

      <div role="search" aria-label="Icon gallery" className="mt-8 grid gap-4 sm:grid-cols-[1fr_14rem]">
        <div>
          <label htmlFor="icon-search" className="mb-2 block text-sm font-medium">Search icons</label>
          <input
            id="icon-search"
            ref={searchInput}
            type="search"
            className={fieldClass}
            placeholder="Try terminal, SQL, or Git"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="icon-category" className="mb-2 block text-sm font-medium">Category</label>
          <select
            id="icon-category"
            className={fieldClass}
            value={category}
            onChange={(event) => setCategory(event.currentTarget.value)}
          >
            <option value="">All categories</option>
            {categories.map((name) => <option key={name}>{name}</option>)}
          </select>
        </div>
      </div>

      <p role="status" className="mt-6 mb-3 text-sm tabular-nums text-zinc-600 dark:text-zinc-400">
        {results.length} of {icons.length} sample icons
      </p>
      {results.length > 0 ? (
        <ul role="list" aria-label="Icons" className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((icon) => <IconCard key={icon.slug} icon={icon} />)}
        </ul>
      ) : (
        <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 className="text-lg font-semibold">No matching icons</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Try a different search or category.</p>
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
    </main>
  )
}

export default App
