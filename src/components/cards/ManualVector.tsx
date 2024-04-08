import { CardProps } from "@yext/search-ui-react";
import Ce_manual from "../../types/manual";

const ManualVector = ({ result }: CardProps<Ce_manual>) => {
  const {
    description,
    c_primaryCTA,
    c_carmodel_type,
    c_secondaryCTA,
    c_productionDate,
    s_snippet,
  } = result.rawData;
  const { name: _name, segment } = result;
  const { c_manual_file, photoGallery } = result.rawData;
  const { url, name, size, mimeType } = c_manual_file;
  return (
    <div className="border items-center p-4 font-semibold leading-6 text-gray-900 group-hover:text-gray-600 flex  gap-4">
      <img src={photoGallery[0].image.url} alt="" className="h-36 w-36" />
      <div className="flex flex-col gap-2">
        <div>
          <a href={url} target="_blank" className="hover:underline">
            {_name} - {c_carmodel_type}
          </a>
        </div>
        <div className="text-gray-500 text-sm">{c_productionDate}</div>
        <div className="text-sm text-gray-500">{s_snippet}</div>
      </div>
    </div>
  );
};

export default ManualVector;
