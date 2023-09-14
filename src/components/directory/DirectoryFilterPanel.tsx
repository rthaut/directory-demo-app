import { type Dispatch, type SetStateAction, Fragment } from "react";

import clsx from "clsx";

import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

import { Container } from "@/components/Layout";

import { communities } from "./DigitalDirectory";

export default function DirectoryFilterPanel({
  setSearch,
  community,
  setCommunity,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
  community: {
    label: string;
    value: string;
  };
  setCommunity: Dispatch<
    SetStateAction<{
      label: string;
      value: string;
    }>
  >;
}) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="sticky top-16 z-20 flex h-16 flex-col items-center bg-gray-100">
      <Container className="flex-grow items-center space-x-2">
        <div className="flex flex-1 justify-center lg:justify-end">
          <div className="w-full">
            <label htmlFor="search" className="sr-only">
              Search directory
            </label>
            <div className="relative text-gray-400 focus-within:text-gray-500">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search"
                name="search"
                className="block h-10 w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-left leading-5 text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:text-gray-900 focus:placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Search directory"
                type="search"
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <Listbox value={community} onChange={setCommunity}>
          <div className="relative">
            <Listbox.Button className="relative h-10 w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left leading-5 text-gray-700 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:w-48">
              <span className="block truncate sm:hidden">Filter</span>
              <span className="hidden truncate sm:block">
                {community.label}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-full sm:text-sm">
                {communities.map((group) => (
                  <Listbox.Option
                    key={group.value}
                    className={({ active }) =>
                      clsx(
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                        active ? "bg-gray-600 text-white" : "text-gray-900"
                      )
                    }
                    value={group}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx(
                            "mr-4 block truncate sm:mr-0",
                            selected ? "font-semibold" : "font-normal"
                          )}
                        >
                          {group.label}
                        </span>
                        {selected ? (
                          <span
                            className={clsx(
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                              active ? "text-white" : "text-gray-600"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </Container>
    </div>
  );
}
