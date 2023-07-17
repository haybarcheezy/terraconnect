import NavBar from '../NavBar'
import Grass from '../Dashboard/Grass'
import { Footer } from '../../components/Footer'

export default function PropertiesLayout({ children, userInitials }) {
  return (
    <>
      <div className="min-h-full">
        <div className="bg-emerald-800 pb-32">
          <NavBar userInitials={userInitials} />

          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">Properties</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="z-20 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg">
              <div className=" rounded-lg bg-white">{children}</div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
