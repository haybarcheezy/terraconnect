import { useState } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'

export default function BulkUpload() {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0])
  }

  const handleUpload = async () => {
    const token = localStorage.getItem('auth_token')

    if (selectedFile) {
      const formData = new FormData()
      formData.append('file', selectedFile)

      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/lands/bulk_upload/',
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )

        console.log(response.data)

        setSelectedFile(null)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const { getInputProps, open, isDragActive } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    onDrop: handleFileChange,
  })

  return (
    <div className="sm:col-span-6">
      <label
        htmlFor="file-upload"
        className="block text-sm font-medium text-gray-700"
      >
        Bulk Upload
      </label>
      <div
        onClick={open} // Opening file dialog on click
        className={`mt-1 flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 ${
          isDragActive ? 'bg-emerald-100' : ''
        }`}
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            {/* SVG path code */}
          </svg>
          <div className="flex text-sm text-gray-600">
            <input
              {...getInputProps()}
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
            />
            <span className="relative cursor-pointer rounded-md bg-white font-medium text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-800 focus-within:ring-offset-2 hover:text-emerald-800">
              Drag and drop a CSV file here, or click to select a file
            </span>
          </div>
          <p className="text-xs text-gray-500">CSV files</p>
        </div>
        {selectedFile && (
          <button
            type="button"
            className="mt-2 inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
            onClick={handleUpload}
          >
            Submit {selectedFile.name}
          </button>
        )}
      </div>
    </div>
  )
}
