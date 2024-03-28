import {
  Matcher,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import * as React from "react";

interface DirectoryGridProps {
  name?: string;
  description?: string;
  directoryParents?: any[];
  directoryChildren?: any[];
  relativePrefixToRoot?: string;
}

const sortByName = (a: any | any, b: any | any) => {
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
};

const DirectoryStateGrid = ({
  name,
  description,
  directoryChildren,
  relativePrefixToRoot,
}: DirectoryGridProps) => {
  const handleClick = (childName: string) => {
    localStorage.setItem("carYear", childName);
  };

  let sortedChildren;
  let childrenDivs;
  if (directoryChildren) {
    sortedChildren = directoryChildren?.sort(sortByName) || [];
    childrenDivs = sortedChildren.map((child: any) => {
      let img = child.dm_directoryChildren?.[0]?.photoGallery?.[0]?.image?.url;
      return (
        <a
          href="/search.html?verticalKey=manual"
          key={child.slug}
          onClick={() => handleClick(child.name)}
          className="border p-4 bg-white hover:underline hover:cursor-pointer"
        >
          <div key="uRL" className="font-bold text-[#202020] ">
            <img src={img} alt="" />
            {child.name} ({child.dm_childEntityIds?.length || 0})
          </div>
        </a>
      );
    });
  }
  return (
    <>
      <div className="section space-y-14 px-10">
        <div className="space-y-6">
          {description && <p className="text-2xl text-center">{description}</p>}
        </div>
        {directoryChildren && (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {childrenDivs}
          </div>
        )}
      </div>
    </>
  );
};

export default DirectoryStateGrid;
