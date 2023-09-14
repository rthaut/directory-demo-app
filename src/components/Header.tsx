import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Disclosure } from "@headlessui/react";
import { UserGroupIcon } from "@heroicons/react/20/solid";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Container } from "@/components/Layout";

const navigation = [
  { name: "Digital Directory", href: "/" },
  { name: "Information (for Sam)", href: "/info" },
];

export default function Header() {
  const router = useRouter();

  const logout = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  return (
    <Disclosure as="nav" className="flex-shrink-0 bg-gray-800">
      {({ open }) => (
        <>
          <Container className="flex-grow items-center">
            <div className="relative flex h-16 w-full items-center justify-between">
              {/* Logo section */}
              <div className="flex items-center">
                <Link
                  href="/"
                  className="flex flex-shrink-0 flex-row items-center space-x-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-600"
                >
                  <>
                    <UserGroupIcon className="h-8 w-auto text-cyan-400" />
                    <span className="text-xl font-semibold text-cyan-50">
                      Directory Demo App
                    </span>
                  </>
                </Link>
              </div>
              <div className="flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-600 p-2 text-cyan-400 hover:bg-gray-600 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-600">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* Desktop links section */}
              <div className="hidden md:block">
                <div className="flex items-center justify-end">
                  <div className="flex">
                    {navigation.map((item) => (
                      <Link
                        href={item.href}
                        key={item.name}
                        className={clsx(
                          "rounded-md px-3 py-2 text-sm hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-600",
                          router.pathname === item.href
                            ? "font-semibold text-white"
                            : "font-medium text-gray-200",
                        )}
                        aria-current={
                          router.pathname === item.href ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="relative ml-4 flex-shrink-0 border-l border-gray-700 pl-3 pr-2">
                    <button
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-600"
                      onClick={logout}
                      title="Logout"
                    >
                      <span className="sr-only">Logout</span>
                      <ArrowRightOnRectangleIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          {/* Mobile links section */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} passHref legacyBehavior>
                  <Disclosure.Button
                    as="a"
                    className={clsx(
                      "block rounded-md px-3 py-2 text-base",
                      router.pathname === item.href
                        ? "bg-gray-800 font-semibold text-white"
                        : "font-medium text-gray-200 hover:bg-gray-600 hover:text-gray-100",
                    )}
                    aria-current={
                      router.pathname === item.href ? "page" : undefined
                    }
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-700 py-3">
              <div className="space-y-1 px-2">
                <button
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-200 hover:bg-gray-600 hover:text-gray-100"
                  onClick={logout}
                  title="Logout"
                >
                  Logout
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
