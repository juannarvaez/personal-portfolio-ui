import { Outlet } from 'react-router'
import { LocaleProvider } from '@/i18n'

/** Root layout: shared chrome and providers for every page go here. */
function App() {
  return (
    <LocaleProvider>
      <main className="min-h-screen">
        <Outlet />
      </main>
    </LocaleProvider>
  )
}

export default App
