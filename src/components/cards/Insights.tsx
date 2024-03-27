import { CardProps } from "@yext/search-ui-react";
import Ce_insights from "../../types/insights";

const Insights = ({ result }: CardProps<Ce_insights>) => {
  const { name } = result;
  const { description, c_primaryCTA, c_brand, c_author, websiteUrl } =
    result.rawData;
  return (
    <div className="border p-4 font-semibold leading-6 text-gray-900 group-hover:text-gray-600 flex flex-col gap-4">
      <div>{name}</div>
      <div className="flex gap-2">
        <div className=" flex items-center  text-xs">
          <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
            {c_brand}
          </span>
        </div>

        <div className=" flex items-center  text-xs">
          <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
            {c_author}
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-500">{description}</div>
      <div className="flex text-sm items-center gap-4">
        {c_primaryCTA && (
          <a
            href={c_primaryCTA.link}
            className="relative border z-10 bg-gray-50 px-3 py-1.5 font-medium text-[#218a3c] hover:bg-gray-100"
          >
            {c_primaryCTA.label}
          </a>
        )}
        {websiteUrl && (
          <a
            href={websiteUrl.url}
            className="relative border z-10 bg-gray-50 px-3 py-1.5 font-medium text-[#218a3c] hover:bg-gray-100"
          >
            View Site
          </a>
        )}
      </div>
    </div>
  );
};

export default Insights;
