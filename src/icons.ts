export type Icon = {
  slug: string
  name: string
  category: string
  aliases: readonly string[]
}

export const icons: readonly Icon[] = [
  { slug: 'sample', name: 'Code Brackets', category: 'Development', aliases: ['code', 'markup', 'html'] },
  { slug: 'terminal', name: 'Terminal', category: 'Development', aliases: ['command line', 'cli', 'shell', 'console'] },
  { slug: 'database', name: 'Database', category: 'Data', aliases: ['sql', 'storage'] },
  { slug: 'branch', name: 'Branch', category: 'Version control', aliases: ['git', 'source control'] },
]
