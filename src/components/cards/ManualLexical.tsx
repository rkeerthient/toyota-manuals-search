import { CardProps } from "@yext/search-ui-react";
import Ce_manual from "../../types/manual";
import { FaFileAlt } from "react-icons/fa";

const ManualLexical = ({ result }: CardProps<Ce_manual>) => {
  const {
    description,
    c_primaryCTA,
    c_secondaryCTA,
    s_snippet,
    c_carmodel_type,
    c_productionDate,
  } = result.rawData;
  const { name: _name, segment } = result;
  const { c_manual_file, photoGallery } = result.rawData;
  const { url, name, size, mimeType } = c_manual_file;

  return (
    <div className="border items-center p-4 font-semibold leading-6 text-gray-900 group-hover:text-gray-600 flex  gap-4">
      <img src={photoGallery?.[0]?.image.url} alt="" className="h-36 w-36" />
      <div className="flex flex-col gap-2">
        <div>
          {_name} - {c_carmodel_type}
        </div>
        <div className="text-gray-500 text-sm">{c_productionDate}</div>
        <div className="text-sm text-gray-500">{s_snippet}</div>
        <div className="flex text-sm items-center gap-1">
          <FaFileAlt />
          <a href={url} className="underline text-[#8bb0cd]">
            {name}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ManualLexical;
