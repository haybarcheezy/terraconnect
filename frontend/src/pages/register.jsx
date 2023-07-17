import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { DarkLogo } from '@/components/DarkLogo'
import axios from 'axios'
import router from 'next/router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Register() {
  const [errorMessage, setErrorMessage] = useState('')

  async function handleFormSubmit(event) {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)

    // convert FormData to JSON
    let json = {}
    formData.forEach((value, key) => {
      json[key] = value
    })

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/auth/users/',
        json
      )

      // Handle the response
      if (response.status === 201) {
        // Registration successful, redirect to login
        router.push('/login')
        toast.success('Registration Successful!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      } else {
        throw new Error('Registration failed')
      }
    } catch (error) {
      // Handle network or other errors
      setErrorMessage('Registration failed. Please try again.')
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up - TerraConnect</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <DarkLogo className="h-10 w-auto" />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Get started for free
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Already registered?{' '}
              <Link
                href="/login"
                className="font-medium text-emerald-700 hover:underline"
              >
                Sign in
              </Link>{' '}
              to your account.
            </p>
          </div>
        </div>
        <form
          action="/api/register"
          method="POST"
          onSubmit={handleFormSubmit}
          className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2"
        >
          <TextField
            label="First name"
            id="first_name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
          />
          <TextField
            label="Last name"
            id="last_name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            required
          />
          <TextField
            className="col-span-full"
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            className="col-span-full"
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
          <div className="col-span-full">
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign up <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}
