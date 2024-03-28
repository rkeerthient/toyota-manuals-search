import {
  Matcher,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import * as React from "react";

interface DirectoryRootProps {
  name?: string;
  description?: string;
  directoryChildren?: any;
  relativePrefixToRoot?: string;
}

const sortChildrenByName = (a: any | any, b: any | any) => {
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
};

const DirectoryRootGrid = ({
  name,
  description,
  directoryChildren,
  relativePrefixToRoot,
}: DirectoryRootProps) => {
  const sortedChildren = directoryChildren?.sort(sortChildrenByName) || [];

  const handleClick = (childName: string) => {};

  const childrenDivs = sortedChildren.map((child: any) => (
    <a
      href={relativePrefixToRoot + child.slug}
      key={child.slug}
      onClick={() => handleClick(child.name)}
      className="text-[#202020] hover:text-[#555555] px-2 font-bold border-b-[1px] border-black hover:border-b-[2px] hover:border-[#eb1a0e] pb-4"
    >
      {child.c_addressRegionDisplayName
        ? child.c_addressRegionDisplayName
        : child.name}
    </a>
  ));
  return (
    <>
      <div className="section space-y-14 px-10">
        <div className="space-y-6">
          {name && (
            <h1 className="text-3xl font-semibold text-center">{name}</h1>
          )}
        </div>
        {directoryChildren && (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
            {childrenDivs}
          </div>
        )}
      </div>
    </>
  );
};

export default DirectoryRootGrid;
