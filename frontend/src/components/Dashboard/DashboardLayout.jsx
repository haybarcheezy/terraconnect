import NavBar from '../NavBar'
import Grass from '../Dashboard/Grass'

export default function DashboardLayout({
  childrenLeft,
  childrenRight,
  userInitials,
}) {
  return (
    <>
      <div className="min-h-full">
        <div className="bg-emerald-800  pb-32">
          <NavBar userInitials={userInitials} />

          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            </div>
          </header>
          <div className="-mb-36">
            <Grass />
          </div>
        </div>

        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              <div className="z-50 grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <h2 className="sr-only" id="section-1-title">
                    Section title
                  </h2>
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="z-20 p-6">{childrenLeft}</div>
                  </div>
                </section>
              </div>

              <div className="z-50 grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  <h2 className="sr-only" id="section-2-title">
                    Section title
                  </h2>
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="z-20 p-6">{childrenRight}</div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
