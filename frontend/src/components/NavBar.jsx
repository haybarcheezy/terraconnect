import { useRouter } from 'next/router'
import { Fragment } from 'react'
import Link from 'next/link'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'
import { Logo } from '../components/Logo'
import 'react-toastify/dist/ReactToastify.css'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Properties', href: '/properties' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ userInitials }) {
  const router = useRouter()

  const notify = () =>
    toast.warn('Successfully Signed Out!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })

  const handleLogout = (event) => {
    event.preventDefault()

    // Remove the token from localStorage
    localStorage.removeItem('auth_token')

    // Redirect to the login page
    router.push('/login')
    notify()
  }

  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', onClick: handleLogout, cursorPointer: true },
  ]

  return (
    <Disclosure
      as="nav"
      className="border-b border-emerald-300 border-opacity-25 bg-emerald-800 lg:border-none"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl ">
            <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-emerald-600 lg:border-opacity-25">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <Link href="/dashboard">
                    <Logo className="h-4 w-4" />
                  </Link>
                </div>
                <div className="hidden lg:ml-10 lg:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          router.pathname === item.href
                            ? 'bg-emerald-900 text-white'
                            : 'text-white hover:bg-emerald-900 hover:bg-opacity-75',
                          'rounded-md py-2 px-3 text-sm font-medium'
                        )}
                        aria-current={
                          router.pathname === item.href ? 'page' : undefined
                        }
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      className="focus:border-emerald-950 focus:ring-emerald-950 block w-full rounded-md border border-transparent bg-emerald-900 py-2 pl-10 pr-3 leading-5 text-gray-100 placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-800 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-emerald-800 p-2 text-emerald-300 hover:bg-emerald-900 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-900">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="flex-shrink-0 rounded-full bg-emerald-900 p-1 text-emerald-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-900"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-emerald-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:ring-offset-2 focus:ring-offset-emerald-900">
                        <span className="sr-only">Open user menu</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-sm text-white">
                          {userInitials}
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                onClick={item.onClick}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  item.cursorPointer ? 'cursor-pointer' : '',
                                  'block py-2 px-4 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-emerald-950 text-white'
                      : 'text-white hover:bg-emerald-800 hover:bg-opacity-75',
                    'block rounded-md py-2 px-3 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-emerald-950 border-t pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-emerald-300">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-full bg-emerald-900 p-1 text-emerald-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-900"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    onClick={item.onClick}
                    className=" block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-emerald-800 hover:bg-opacity-75"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
