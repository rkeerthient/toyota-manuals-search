import * as React from "react";
import { Address } from "@yext/pages-components";
import { formatPhoneNumber } from "react-phone-number-input";
import { DirectoryParent } from "../types/DirectoryParent";
import { DirectoryChild } from "../types/DirectoryChild";

export interface DirectoryGridProps {
  name?: string;
  description?: string;
  directoryParents?: DirectoryParent[];
  directoryChildren?: DirectoryChild[];
  relativePrefixToRoot?: string;
}

const DirectoryCityGrid = ({
  name,
  description,
  directoryChildren,
  relativePrefixToRoot,
}: DirectoryGridProps) => {
  let childrenDivs;

  if (directoryChildren) {
    childrenDivs = directoryChildren.map((child: any) => (
      <div
        key={child.slug}
        className="border rounded-lg drop-shadow-md bg-gray-100 space-y-6 p-3 h-60"
      >
        <h2>
          <a
            className="font-bold text-2xl text-blue-700 hover:underline"
            href={relativePrefixToRoot + child.slug}
          >
            {child.name}
          </a>
        </h2>
        <div className="m-1 border"></div>
      </div>
    ));
  }
  return (
    <>
      <div className="section space-y-14 px-10">
        <div className="space-y-6">
          {name && (
            <h1 className="text-3xl font-semibold text-center">{name}</h1>
          )}
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

export default DirectoryCityGrid;
