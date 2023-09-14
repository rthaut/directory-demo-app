import {
  type Household,
  AddressType,
  GetHouseholdAddressStrings,
} from "@/lib/directory";

import { MapPinIcon } from "@heroicons/react/20/solid";

import {
  DescriptionListTerm,
  DescriptionListDescription,
  DescriptionListButtonClasses,
} from "@/components/Layout";

export default function HouseholdAddressData({
  household,
  type,
}: {
  household: Household;
  type: AddressType;
}) {
  const addressLines = GetHouseholdAddressStrings(household, type);
  if (addressLines.length < 2) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col space-y-1 md:space-y-0">
        <DescriptionListTerm>{type.toString()} Address</DescriptionListTerm>
        <DescriptionListDescription>
          <address className="not-italic">
            {addressLines[0]}
            <br />
            {addressLines[1]}
          </address>
        </DescriptionListDescription>
      </div>
      {type === AddressType.Physical && (
        <a
          href={
            "https://www.google.com/maps/dir/?api=1&destination=" +
            encodeURI(addressLines.join(", "))
          }
          target="_blank"
          rel="noreferrer nofollow"
          className={DescriptionListButtonClasses}
          title="Open in Google Maps"
        >
          <MapPinIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
          <span className="sr-only">Open in Google Maps</span>
        </a>
      )}
    </div>
  );
}
