import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DetailLayout from '../../components/Dashboard/DetailLayout'
import axios from 'axios'
import DeleteModal from '../../components/Dashboard/DeleteModal'
import PhotoUpload from '../../components/Dashboard/PhotoUpload'
import { PlusSmallIcon } from '@heroicons/react/24/solid'

export default function Property() {
  const [user, setUser] = useState(null)
  const [userInitials, setUserInitials] = useState('')
  const router = useRouter()
  const { id } = router.query
  const [property, setProperty] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPhotoUpload, setShowPhotoUpload] = useState(false)
  const [formChanged, setFormChanged] = useState(false)
  const [newField, setNewField] = useState({ label: '', value: '' })
  const [showNewField, setShowNewField] = useState(false)

  useEffect(() => {
    const getProperty = async () => {
      const token = localStorage.getItem('auth_token')

      try {
        const response = await axios.get(`http://127.0.0.1:8000/lands/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        })

        setProperty(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    if (id) {
      getProperty()
    }
  }, [id])

  const [form, setForm] = useState({
    name: '',
    address: '',
    acreage: '',
    extra_fields: [],
  })

  useEffect(() => {
    if (property) {
      setForm({
        name: property.name,
        address: property.address,
        acreage: property.acreage,
        extra_fields: property.extra_fields || [],
      })
    }
  }, [property])

  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
    setFormChanged(true)
  }

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('auth_token')

      try {
        const response = await axios.get(
          'http://localhost:8000/auth/users/me/',
          {
            headers: { Authorization: `Token ${token}` },
          }
        )

        setUser(response.data)
        const initials =
          response.data.first_name[0] + response.data.last_name[0]
        setUserInitials(initials.toUpperCase())
      } catch (error) {
        console.error(error)
      }
    }

    getUser()
  }, [])

  const handleFieldChange = (index, value) => {
    const updatedFields = [...form.extra_fields]
    updatedFields[index].value = value
    setForm({ ...form, extra_fields: updatedFields })
    setFormChanged(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const token = localStorage.getItem('auth_token')

    try {
      const updatedProperty = {
        name: form.name,
        address: form.address,
        acreage: form.acreage,
        extra_fields: form.extra_fields,
      }

      await axios.put(`http://127.0.0.1:8000/lands/${id}/`, updatedProperty, {
        headers: { Authorization: `Token ${token}` },
      })
      toast.success('Property Updated Successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } catch (error) {
      console.error(error)

      toast.error('Error Updating Property!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

  const confirmDelete = async () => {
    const token = localStorage.getItem('auth_token')

    try {
      await axios.delete(`http://127.0.0.1:8000/lands/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })

      // Show a success message
      toast.error('Property Deleted!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })

      // Close the delete modal
      setShowDeleteModal(false)

      // Redirect to another page (optional)
      router.push('/properties')
    } catch (error) {
      console.error(error)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
  }

  const handleFieldDelete = (index) => {
    const updatedFields = [...form.extra_fields]
    updatedFields.splice(index, 1)
    setForm({ ...form, extra_fields: updatedFields })
    setFormChanged(true)
  }

  const addNewField = () => {
    setShowNewField(true)
  }

  const handleNewField = () => {
    if (newField.label !== '' && newField.value !== '') {
      const updatedField = {
        label: newField.label,
        value: newField.value,
        isNew: true,
      }
      const updatedFields = [...form.extra_fields, updatedField]
      setForm({ ...form, extra_fields: updatedFields })
      setFormChanged(true)
      setShowNewField(false)
      setNewField({ label: '', value: '' })
    }
  }

  const handleNewFieldLabelChange = (value) => {
    setNewField({ ...newField, label: value })
    setFormChanged(true)
  }

  const handleNewFieldValueChange = (value) => {
    setNewField({ ...newField, value: value })
    setFormChanged(true)
  }

  return (
    <>
      <Head>
        <title>Manage Property - TerraConnect</title>
      </Head>
      <DetailLayout userInitials={userInitials}>
        <aside className="py-6 lg:col-span-3">
          <nav className="space-y-1">
            <div className=" px-4">
              {showPhotoUpload ? (
                <div>
                  <PhotoUpload id={id} />
                  <div className="my-2">
                    <button
                      className="ml-2 rounded border border-red-500 py-1 px-2 text-xs text-red-500"
                      onClick={() => setShowPhotoUpload(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : property && property.image ? (
                <div>
                  <div
                    className="bg-full relative max-w-xs overflow-hidden rounded-lg bg-no-repeat hover:cursor-pointer"
                    onClick={() => setShowPhotoUpload(true)}
                  >
                    <img
                      className="h-full w-full object-cover"
                      src={property.image}
                      alt="Property"
                    />
                    <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-emerald-700 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
                  </div>
                </div>
              ) : (
                <PhotoUpload id={id} />
              )}
              <div className="py-4">
                <h3 className="font-medium text-gray-900">Information</h3>
                <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                  {Object.keys(form).map((key) => {
                    if (key === 'extra_fields') {
                      return (
                        form[key].length > 0 && (
                          <div key={key} className="py-3">
                            <div className="divide-y divide-gray-200">
                              {form[key].map((field, index) => (
                                <div
                                  key={field.label}
                                  className={`flex justify-between py-2 text-sm font-medium ${
                                    index !== form[key].length - 1 ? 'mb-1' : ''
                                  }`}
                                >
                                  <dt className="text-gray-500">
                                    {field.label}
                                  </dt>
                                  <dd className="text-gray-900">
                                    {field.value}
                                  </dd>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )
                    } else {
                      return (
                        <div
                          key={key}
                          className="flex justify-between py-3 text-sm font-medium"
                        >
                          <dt className="text-gray-500">{key}</dt>
                          <dd className="text-gray-900">{String(form[key])}</dd>
                        </div>
                      )
                    }
                  })}
                </dl>
                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="ml-3 flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm  hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Delete Property
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </aside>
        {property ? (
          <form
            className="divide-y divide-gray-200 px-8 pb-8 lg:col-span-9"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="mt-10 divide-y divide-gray-200">
              <div className="space-y-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Property Information
                </h3>
                <p className="max-w-2xl text-sm text-gray-500">
                  View and edit property information.
                </p>
              </div>
              <div className="mt-6">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <input
                        className="  border-1 flex-grow rounded-md border-gray-50 bg-gray-100 p-1 shadow-sm sm:text-sm"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                      />
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <input
                        className="border-1 flex-grow rounded-md border-gray-50 bg-gray-100 p-1 shadow-sm sm:text-sm"
                        name="address"
                        value={form.address}
                        onChange={handleInputChange}
                      />
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Acreage
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <input
                        className="border-1 flex-grow rounded-md border-gray-50 bg-gray-100 p-1 shadow-sm sm:text-sm"
                        name="acreage"
                        value={form.acreage}
                        onChange={handleInputChange}
                      />
                    </dd>
                  </div>
                </dl>
              </div>
              {form.extra_fields.map((field, index) => (
                <div
                  className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5"
                  key={field.label}
                >
                  <dt className="text-sm font-medium text-gray-500">
                    {field.label}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input
                      className="border-1 flex-grow rounded-md border-gray-50 bg-gray-100 p-1 shadow-sm sm:text-sm"
                      value={field.value}
                      onChange={(e) => handleFieldChange(index, e.target.value)}
                    />
                    {!field.isNew && ( // Show the delete button only if the field is not new
                      <button
                        onClick={() => handleFieldDelete(index)}
                        className="ml-2 rounded border border-red-500 py-1 px-2 text-xs text-red-500"
                      >
                        Delete
                      </button>
                    )}
                  </dd>
                </div>
              ))}
              {showNewField ? (
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    <input
                      className="border-1 flex-grow rounded-md border-gray-50 bg-gray-100 p-1 shadow-sm sm:text-sm"
                      placeholder="Enter field label"
                      onChange={(e) =>
                        handleNewFieldLabelChange(e.target.value)
                      }
                      value={newField.label}
                    />
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input
                      className="border-1 flex-grow rounded-md border-gray-50 bg-gray-100 p-1 shadow-sm sm:text-sm"
                      placeholder="Enter field value"
                      onChange={(e) =>
                        handleNewFieldValueChange(e.target.value)
                      }
                      value={newField.value}
                    />
                    <button
                      type="button"
                      onClick={handleNewField} // Add this line to call the handleNewField function
                      className="ml-2 rounded border border-green-500 py-1 px-2 text-xs text-green-500"
                    >
                      Save
                    </button>
                  </dd>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={addNewField}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <PlusSmallIcon className="h-5 w-5" aria-hidden="true" />
                  Add Field
                </button>
              )}

              {showDeleteModal && (
                <DeleteModal
                  title="Delete Property"
                  content="Are you sure you want to delete this property? All of it's data will be permanently removed. This action cannot be undone."
                  onConfirm={confirmDelete}
                  onClose={cancelDelete}
                />
              )}
              {formChanged && (
                <button
                  className="flex-1 rounded-md border border-transparent bg-emerald-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-800  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  type="submit"
                >
                  Save Information
                </button>
              )}
            </div>
          </form>
        ) : (
          <div>Loading...</div>
        )}
      </DetailLayout>
    </>
  )
}
