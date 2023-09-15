import { Dialog, Transition } from "@headlessui/react";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

export default function SlideOver({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Transition.Root as={Fragment} show={open}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-hidden"
        onClose={onClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0 bg-black/25" />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300 md:duration-500"
              leave="transform transition ease-in-out duration-300 md:duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen md:max-w-md">
                <div className="flex h-full flex-col bg-gray-100 shadow-xl">
                  <div className="h-16 flex-shrink-0 overflow-y-hidden bg-gray-800 px-2 sm:px-4">
                    <div className="flex h-full items-center">
                      <button
                        type="button"
                        className="rounded-md bg-gray-600 p-2 text-cyan-400 hover:bg-gray-600 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-600"
                        onClick={onClose}
                      >
                        <div className="flex place-items-center md:hidden">
                          <ArrowLeftIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                          <span className="mx-2 -mt-0.5 uppercase">Back</span>
                        </div>
                        <div className="hidden place-items-center md:flex">
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          <span className="mx-2 -mt-0.5 uppercase">Close</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="overflow-y-auto">{children}</div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
