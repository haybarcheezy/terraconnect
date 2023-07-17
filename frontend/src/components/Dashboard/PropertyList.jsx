import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { HomeModernIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function PropertyList(props) {
  const [properties, setProperties] = useState(props.properties.slice(0, 6))
  const router = useRouter()

  useEffect(() => {
    setProperties(props.properties.slice(0, 6))
  }, [props.properties])

  const handleRowClick = (id) => {
    router.push(`/properties/${id}`)
  }

  return (
    <div>
      <div className="mt-6 flow-root">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {!properties.length && (
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Create Property
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new property.
              </p>
            </div>
          )}
          {properties.map((property) => (
            <li key={property.id} className="py-4">
              <div className="flex items-center space-x-4">
                {property.image ? (
                  <img
                    className=" h-10 w-10 rounded"
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
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {property.name} |{' '}
                    <span className="text-gray-500">
                      {property.acreage} acres
                    </span>
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    {property.address}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleRowClick(property.id)}
                    className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    View
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <Link
          href="/properties"
          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          View all
        </Link>
      </div>
    </div>
  )
}
