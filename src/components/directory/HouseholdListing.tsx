import clsx from "clsx";
import Avatar from "boring-avatars";
import {
  ChevronRightIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import {
  AddressType,
  CombinePeopleFirstNames,
  GetHouseholdAddressStrings,
  type Household,
} from "@/lib/directory";
import { Container } from "@/components/Layout";
import Link from "next/link";

export default function HouseholdListing({
  household,
}: {
  household: Household;
}) {
  const addresses = GetHouseholdAddressStrings(household, AddressType.Physical);

  return (
    <Link
      scroll={false}
      href={`?household=${household["Name"]}&head=${household["Head"]}`}
      className="w-full text-left focus:outline-none"
    >
      <Container className="flex-grow items-center">
        <div className="flex w-full cursor-pointer justify-between space-x-4 py-3 text-gray-900 sm:py-4 md:grid md:grid-cols-3 lg:grid-cols-4">
          <div className="md:col-span-2 lg:col-span-3 lg:flex lg:flex-row">
            <div className="flex content-between items-start sm:space-x-4">
              <div className="hidden opacity-75 group-hover:opacity-100 sm:block">
                <HouseholdAvatar household={household} />
              </div>
              <div className="leading-2 flex flex-col">
                <span className="text-base font-semibold">
                  {household.Name}
                </span>
                <span className="text-base leading-5 text-gray-800">
                  {CombinePeopleFirstNames(household.People)}
                </span>
              </div>
            </div>
            <div className="ml-8 hidden items-center lg:flex">
              {household.People.map((person) => person.Position)
                .filter(Boolean)
                .map((position) => (
                  <span
                    key={position}
                    className="inline-flex items-center rounded-full bg-cyan-900 px-3 py-1 text-xs font-normal uppercase tracking-wide text-cyan-200 opacity-90 group-hover:opacity-100"
                  >
                    {position}
                  </span>
                ))}
            </div>
          </div>
          <div className="hidden md:col-span-1 md:flex md:items-center">
            <address className="truncate whitespace-nowrap not-italic text-gray-700">
              {addresses[0]}
              <br />
              {addresses[1]}
            </address>
          </div>
        </div>
        <div>
          <ChevronRightIcon
            className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
            aria-hidden="true"
          />
        </div>
      </Container>
    </Link>
  );
}

function HouseholdAvatar({ household }: { household: Household }) {
  const classes = "absolute text-white/75 -inset-x-1 h-14 w-14";

  return (
    <div className="relative h-12 w-12 overflow-hidden rounded-full">
      <div className="absolute inset-0">
        <Avatar
          name={`${CombinePeopleFirstNames(household.People)} ${
            household.Name
          }`}
          size={48}
          variant="marble"
        />
      </div>
      {household.People.length === 1 ? (
        <UserIcon className={clsx(classes, "-bottom-3")} />
      ) : household.People.length === 2 ? (
        <UsersIcon className={clsx(classes, "-bottom-3")} />
      ) : (
        <UserGroupIcon className={clsx(classes, "-bottom-2")} />
      )}
    </div>
  );
}
