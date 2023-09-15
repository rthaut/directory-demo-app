import { useCallback, useEffect, useMemo, useState } from "react";
import { GroupPeopleIntoHouseholds, type Person } from "@/lib/directory";

import data from "../../data.json";

export function useDirectory() {
  // NOTE: simulating IndexedDB storage

  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setPeople(data);
      setIsLoading(false);
    }, 1500);
  }, []);

  const households = useMemo(() => GroupPeopleIntoHouseholds(people), [people]);

  const getHousehold = useCallback(
    (name: string, head: string) =>
      households.find(
        (household) => household.Head === head && household.Name === name,
      ),
    [households],
  );

  return { people, households, loading: isLoading, getHousehold };
}
