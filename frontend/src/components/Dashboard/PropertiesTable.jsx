import { useRouter } from 'next/router'
import { HomeModernIcon } from '@heroicons/react/24/solid'

export default function PropertiesTable({
  properties,
  currentPage,
  totalPages,
  handlePageChange,
}) {
  const router = useRouter()

  const handleRowClick = (id) => {
    router.push(`/properties/${id}`)
  }

  const formatLastUpdated = (lastUpdated) => {
    const date = new Date(lastUpdated)
    return date.toLocaleString()
  }

  return (
    <div className="z-20 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Acreage
                  </th>
                  <th
                    scope="col"
                    className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell"
                  >
                    Last Updated
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td className="hidden whitespace-nowrap px-6 py-4 md:table-cell">
                      <div className="text-sm text-gray-900">{property.id}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        {property.image ? (
                          <img
                            className="h-10 w-10 rounded"
                            src={property.image}
                            alt="Property"
                          />
                        ) : (
                          <div className="h-10 w-10 flex-shrink-0">
                            <HomeModernIcon
                              className="h-10 w-10 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {property.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden whitespace-nowrap px-6 py-4 md:table-cell">
                      <div className="text-sm text-gray-900">
                        {property.address}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        {property.acreage}
                      </span>
                    </td>
                    <td className="hidden whitespace-nowrap px-6 py-4 md:table-cell">
                      <div className="text-xs text-gray-700">
                        {formatLastUpdated(property.last_updated)}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleRowClick(property.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => handlePageChange('previous')}
                  className="rounded-l-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </button>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`border-t border-b border-gray-300 bg-white px-3 py-1 text-sm font-medium ${
                      currentPage === page
                        ? 'text-emerald-400 hover:bg-indigo-50'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange('next')}
                  className="rounded-r-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
            <div className="mt-4 flex justify-center">
              <p className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
