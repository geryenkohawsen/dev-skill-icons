function App() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <header className="border-b border-zinc-200 pb-10 dark:border-zinc-800">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Dev Skill Icons</h1>
        <p className="mt-4 max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          A community-maintained SVG icon library for developers.
        </p>
        <a
          className="mt-5 inline-flex min-h-11 items-center font-medium underline underline-offset-4"
          href="https://github.com/geryenkohawsen/dev-skill-icons"
        >
          View the GitHub repository
        </a>
      </header>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Sample icon</h2>
        <div className="mt-4 flex items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
          <img src="/icons/sample.svg" width="48" height="48" alt="" />
          <a
            className="inline-flex min-h-11 items-center font-medium underline underline-offset-4"
            href="/icons/sample.svg"
          >
            Open sample SVG
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
