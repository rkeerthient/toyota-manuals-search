import * as React from "react";
import { useState } from "react";
import { useContext } from "react";

const SearchTermContext = React.createContext<any>({});

export const SearchTermProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [filterCar, setFilterCar] = useState<any>();
  const [filterYear, setFilterYear] = useState<any>();

  return (
    <SearchTermContext.Provider
      value={React.useMemo(
        () => ({
          filterCar,
          setFilterCar,
          filterYear,
          setFilterYear,
        }),
        [filterCar, setFilterCar, filterYear, setFilterYear]
      )}
    >
      {children}
    </SearchTermContext.Provider>
  );
};
// make sure use
export const useSearchTermContext = () => {
  return useContext(SearchTermContext);
};
