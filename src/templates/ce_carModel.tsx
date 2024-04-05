import * as React from "react";
import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import { isProduction } from "@yext/pages/util";
import "../index.css";
import DirectoryStateGrid from "../components/DirectoryStateGrid";
import Breadcrumbs from "../components/Breadcrumbs";
import PageLayout from "../components/page-layout";

export const config: TemplateConfig = {
  stream: {
    $id: "carmodel-stream",
    filter: {
      entityTypes: ["ce_carModel"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "photoGallery",
      "dm_directoryParents_toyota_manual_final.name",
      "dm_directoryParents_toyota_manual_final.slug",
      "dm_directoryParents_toyota_manual_final.meta",
      "dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.photoGallery",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.photoGallery",
    ],
    localization: {
      locales: ["ja"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return `${document.slug.toString()}`;
};

export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`alias/${document.locale}/${document.id.toString()}`];
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [],
  };
};

export const transformProps: TransformProps<any> = async (data) => {
  const { dm_directoryParents_toyota_manual_final, name } = data.document;

  (dm_directoryParents_toyota_manual_final || []).push({
    name: name,
    slug: "",
  });

  return {
    ...data,
    document: {
      ...data.document,
      dm_directoryParents_toyota_manual_final:
        dm_directoryParents_toyota_manual_final,
    },
  };
};

const CarModel: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const {
    name,
    description,
    siteDomain,
    photoGallery,
    dm_directoryParents_toyota_manual_final,
    dm_directoryChildren,
  } = document;

  return (
    <>
      <PageLayout>
        <div className="section space-y-14 px-10 bg-[#f2f2f2]">
          <div className="centered-container py-8">
            <Breadcrumbs
              breadcrumbs={dm_directoryParents_toyota_manual_final}
              baseUrl={relativePrefixToRoot}
            />
            <DirectoryStateGrid
              name={"name"}
              description={description}
              directoryChildren={dm_directoryChildren}
              relativePrefixToRoot={relativePrefixToRoot}
            />
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default CarModel;
