/* This example requires Tailwind CSS v2.0+ */
import Divider from '@/components/Dashboard/Divider'
import { PlusIcon } from '@heroicons/react/24/solid'
import BulkUpload from '@/components/Dashboard/BulkUpload'

export default function EmptyLands({ onNewPropertyButtonClick }) {
  return (
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
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
          onClick={onNewPropertyButtonClick}
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Property
        </button>
      </div>
      <Divider />
      <BulkUpload />
    </div>
  )
}
