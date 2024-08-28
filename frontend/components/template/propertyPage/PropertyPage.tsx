"use client";
import PropertyImage from "@/components/atoms/propertyPage/PropertyImage";
import { useFetchPropertyData } from "@/hooks/useFetchPropertyData";
import { getPropertyValue } from "@/utlis/getPropertyValue";
import React from "react";
import { useSearchParams, usePathname, useParams } from "next/navigation";
import PropertyTitle from "@/components/atoms/propertyPage/PropertyTitle";
const PropertyPage = () => {
  const { properties } = useFetchPropertyData();
  const searchParams = useSearchParams();
  const params = useParams();
  console.log("name::::", params.propertyId);

  return (
    <div>
      {properties
        .filter((p) => p.id === params.propertyId)
        .map((p) => {
          const {
            id,
            properties: { サムネイル, タイトル, 物件写真 },
          } = p;

          const imgUrl = getPropertyValue(サムネイル, "file");
          const title = getPropertyValue(タイトル, "title");
          const imgLink = getPropertyValue(物件写真, "url");

          return (
            <div key={id}>
              <PropertyImage imgUrl={imgUrl} title={title} imgLink={imgLink} />
              <div className="max-w-[1200px] flex flex-col md:flex-row mx-auto">
                <div className="w-full md:w-[60%] p-2">
                  <PropertyTitle title={title} />
                  <div>物件詳細情報</div>
                </div>
                <div className="w-full md:w-[40%] p-2">
                  <div>スタッフからの一言</div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PropertyPage;
