import NavBar from '../NavBar'
import Grass from '../Dashboard/Grass'

export default function PropertiesLayout({ children, userInitials }) {
  return (
    <>
      <div className="min-h-full">
        <div className="bg-emerald-800 pb-32">
          <NavBar userInitials={userInitials} />
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">Property Detail</h1>
            </div>
          </header>
          <div className="-mb-36">
            <Grass />
          </div>
        </div>

        <main className="relative -mt-32">
          <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
