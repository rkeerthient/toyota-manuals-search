import { CardProps } from "@yext/search-ui-react";
import Ce_manual from "../../types/manual";

const ManualRegular = ({ result }: CardProps<Ce_manual>) => {
 
  const { description, c_primaryCTA, c_secondaryCTA } = result.rawData;
  const { name: _name, segment } = result;
  const { c_manual_file, photoGallery } = result.rawData;
  const { url, name, size, mimeType } = c_manual_file;
  return (
    <div className="border p-4 font-semibold leading-6 text-gray-900 group-hover:text-gray-600 flex flex-col gap-4">
      <img src={photoGallery[0].image.url} alt="" />
      <div>{name}</div>

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
        {c_secondaryCTA && (
          <a
            href={c_secondaryCTA.link}
            className="relative border z-10 bg-gray-50 px-3 py-1.5 font-medium text-[#218a3c] hover:bg-gray-100"
          >
            {c_secondaryCTA.label}
          </a>
        )}
      </div>
    </div>
  );
};

export default ManualRegular;
