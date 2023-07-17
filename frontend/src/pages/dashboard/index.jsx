import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DashboardLayout from '../../components/Dashboard/DashboardLayout'
import EmptyLands from '../../components/Dashboard/EmptyLands'
import PropertyList from '../../components/Dashboard/PropertyList'
import NewPropertyForm from '../../components/Dashboard/NewPropertyForm'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [userInitials, setUserInitials] = useState('')
  const [showNewPropertyForm, setShowNewPropertyForm] = useState(false)
  const [properties, setProperties] = useState([])

  useEffect(() => {
    const getProperties = async () => {
      const token = localStorage.getItem('auth_token')

      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/lands/?sort=reverse',
          {
            headers: { Authorization: `Token ${token}` },
          }
        )

        setProperties(response.data.results)
      } catch (error) {
        console.error(error)
      }
    }

    getProperties()
  }, [])

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

  return (
    <>
      <Head>
        <title>Dashboard - TerraConnect</title>
      </Head>
      <DashboardLayout
        userInitials={userInitials}
        childrenLeft={
          <>
            {showNewPropertyForm ? (
              <NewPropertyForm onAddProperty={handleAddProperty} />
            ) : (
              <EmptyLands
                onNewPropertyButtonClick={() => setShowNewPropertyForm(true)}
              />
            )}
            {/* Other components */}
          </>
        }
        childrenRight={
          <>
            <PropertyList properties={properties} />
            {/* Other components */}
          </>
        }
      />
    </>
  )
}
