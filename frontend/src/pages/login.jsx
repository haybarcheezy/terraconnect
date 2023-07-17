import { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { DarkLogo } from '@/components/DarkLogo'
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const notify = () =>
    toast.success('Login Successful!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:8000/auth/token/login/',
        {
          email,
          password,
        }
      )

      localStorage.setItem('auth_token', response.data.auth_token)
      router.push('/dashboard')
      notify()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Sign In - TerraConnect</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <DarkLogo className="h-10 w-auto" />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Don’t have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-emerald-700 hover:underline"
              >
                Sign up
              </Link>{' '}
              for a free trial.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-10 grid grid-cols-1 gap-y-8"
        >
          <TextField
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}
