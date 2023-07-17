import { useState } from 'react'
import axios from 'axios'
import { TextField } from '@/components/Fields'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function NewPropertyForm(props) {
  const [formData, setFormData] = useState({
    name: '',
    acreage: '',
    address: '',
  })
  const [dynamicFields, setDynamicFields] = useState([])

  const notify = () =>
    toast.success('Property added successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })

  const handleSubmit = async (event) => {
    event.preventDefault()

    const token = localStorage.getItem('auth_token')

    try {
      const data = {
        ...formData,
        extra_fields: dynamicFields.map((field) => ({
          label: field.label,
          value: field.value,
        })),
      }

      const response = await axios.post('http://127.0.0.1:8000/lands/', data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      console.log(response.data) // Handle the response as needed
      props.onAddProperty(response.data)
      notify()
      // Reset the form
      setFormData({
        name: '',
        acreage: '',
        address: '',
      })
      setDynamicFields([])
    } catch (error) {
      console.error(error)
    }
  }
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleAddField = () => {
    const newField = { label: '', value: '' }
    setDynamicFields([...dynamicFields, newField])
  }

  const handleDynamicFieldChange = (index, event, fieldProperty) => {
    const { value } = event.target
    const updatedFields = [...dynamicFields]
    updatedFields[index][fieldProperty] = value
    setDynamicFields(updatedFields)
  }

  const handleRemoveField = (index) => {
    const updatedFields = [...dynamicFields]
    updatedFields.splice(index, 1)
    setDynamicFields(updatedFields)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className=" sm:overflow-hidden">
          <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                New Property Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Insert the information of the new property.
              </p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <TextField
                id="name"
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3 sm:col-span-3"
              />

              <TextField
                id="acreage"
                name="acreage"
                label="Acreage"
                value={formData.acreage}
                onChange={handleChange}
                className="col-span-3 sm:col-span-3"
              />

              <div className="col-span-6">
                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              {dynamicFields.map((field, index) => (
                <div
                  key={index}
                  className="isolate col-span-6 -space-y-px rounded-md shadow-sm"
                >
                  <div className="relative rounded-md rounded-b-none border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:border-emerald-800 focus-within:ring-1 focus-within:ring-emerald-800">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`label${index}`}
                        className="block text-xs font-medium text-gray-700"
                      >
                        Label
                      </label>
                      <button
                        className="cursor-pointer text-red-500"
                        onClick={() => handleRemoveField(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M13.586 10l4.293-4.293a1 1 0 10-1.414-1.414L12.172 8l-4.293-4.293a1 1 0 10-1.414 1.414L10.586 10l-4.293 4.293a1 1 0 001.414 1.414L12.172 12l4.293 4.293a1 1 0 001.414-1.414L13.586 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <input
                      type="text"
                      name={`label${index}`}
                      id={`label${index}`}
                      value={field.label}
                      onChange={(event) =>
                        handleDynamicFieldChange(index, event, 'label')
                      }
                      className="block border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="Label"
                    />
                  </div>
                  <div className="relative rounded-md rounded-t-none border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:border-emerald-800 focus-within:ring-1 focus-within:ring-emerald-800">
                    <label
                      htmlFor={`value${index}`}
                      className="block w-full text-xs font-medium text-gray-700"
                    >
                      Value
                    </label>
                    <input
                      type="text"
                      name={`value${index}`}
                      id={`value${index}`}
                      value={field.value}
                      onChange={(event) =>
                        handleDynamicFieldChange(index, event, 'value')
                      }
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="Value"
                    />
                  </div>
                </div>
              ))}
              <div>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-gray-100 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  onClick={handleAddField}
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  <span className="inline-flex flex-shrink-0 whitespace-nowrap">
                    Add Field
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className=" px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-emerald-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
            >
              Save Property
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
