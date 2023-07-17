import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PropertiesLayout from '../../components/Dashboard/PropertiesLayout'
import EmptyLands from '../../components/Dashboard/EmptyLands'
import PropertiesTable from '../../components/Dashboard/PropertiesTable'
import NewPropertyForm from '../../components/Dashboard/NewPropertyForm'

export default function Properties() {
  const [user, setUser] = useState(null)
  const [userInitials, setUserInitials] = useState('')
  const [showNewPropertyForm, setShowNewPropertyForm] = useState(false)
  const [properties, setProperties] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const getProperties = async () => {
      const token = localStorage.getItem('auth_token')

      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/lands/?sort=reverse',
          {
            headers: { Authorization: `Token ${token}` },
            params: { page: currentPage, limit: 10 }, // Include page and limit parameters
          }
        )

        setProperties(response.data.results)

        const totalProperties = response.data.count
        const propertiesPerPage = 10
        const totalPages = Math.ceil(totalProperties / propertiesPerPage)
        setTotalPages(totalPages)
      } catch (error) {
        console.error(error)
      }
    }

    getProperties()
  }, [currentPage])

  const handleAddProperty = (newProperty) => {
    setProperties([newProperty, ...properties])
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

  const handlePageChange = (page) => {
    let newPage = currentPage

    if (page === 'previous') {
      newPage = currentPage - 1
    } else if (page === 'next') {
      newPage = currentPage + 1
    } else {
      newPage = page
    }

    if (newPage < 1 || newPage > totalPages) {
      return
    }

    setCurrentPage(newPage)
  }

  return (
    <>
      <Head>
        <title>Properties - TerraConnect</title>
      </Head>
      <PropertiesLayout userInitials={userInitials}>
        {properties.length === 0 ? (
          <EmptyLands
            showNewPropertyForm={showNewPropertyForm}
            setShowNewPropertyForm={setShowNewPropertyForm}
          />
        ) : (
          <PropertiesTable
            properties={properties}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )}
        {showNewPropertyForm && (
          <NewPropertyForm
            handleAddProperty={handleAddProperty}
            setShowNewPropertyForm={setShowNewPropertyForm}
          />
        )}
      </PropertiesLayout>
    </>
  )
}
