import React, { useState, useRef } from 'react'
import axios from 'axios'

export default function PhotoUpload({ id }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [land, setLand] = useState({})
  const fileInputRef = useRef()

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0])
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    if (!selectedImage) {
      return
    }

    const formData = new FormData()
    formData.append('image', selectedImage)

    // append other current land data to formData
    Object.keys(land).forEach((key) => {
      if (key !== 'image') {
        // assuming 'image' is the key for the image field
        formData.append(key, land[key])
      }
    })

    const token = localStorage.getItem('auth_token')

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/lands/${id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`,
          },
        }
      )

      console.log(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCancel = (event) => {
    event.preventDefault()
    setSelectedImage(null)
    fileInputRef.current.value = ''
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <button
        type="button"
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="mx-auto h-12 w-12 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <input
          type="file"
          name="image"
          className="text-gray-500"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
      </button>

      {selectedImage ? (
        <>
          <button
            onClick={handleCancel}
            className="ml-3 flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            className="flex-1 rounded-md border border-transparent bg-emerald-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
            type="submit"
          >
            Submit
          </button>
        </>
      ) : null}
    </form>
  )
}
