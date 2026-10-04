import { useEffect } from 'react'

const SITE = 'Quan Kori'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `${SITE} · Notebook`
  }, [title])
}
