"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCreateBannerStore from "@/store/createBanner-store";
import CreateBannerModal from "./CreateBannerModal";
import useEditBannerStore from "@/store/editBanner-store";
import useDeleteBannerStore from "@/store/deleteBanner-store";
import EditBannerModal from "./EditBannerModal";
import DeleteBannerModal from "./DeleteBannerModal";
import useBanners from "@/hooks/queries/useBanners";
import { TBanner } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import NoData from "../NoData";

const BannerTable = () => {
  const createBanner = useCreateBannerStore();
  const editBanner = useEditBannerStore();
  const deleteBanner = useDeleteBannerStore();
  const { banners } = useBanners();
  const [selectBanner, setSelectBanner] = React.useState<TBanner | null>(null);
  const [deleteBannerData, setDeleteBannerData] =
    React.useState<TBanner | null>(null);
  const handleEditBanner = (data: TBanner) => {
    setSelectBanner(data);
    editBanner.onOpen();
  };

  const handleDeleteBanner = (data: TBanner) => {
    setDeleteBannerData(data);
    deleteBanner.onOpen();
  };
  return (
    <>
      <div className="mt-8">
        <div className="flex justify-end">
          <Button onClick={createBanner.onOpen} className="space-x-2">
            <Plus size={16} />
            <span>New Banner</span>
          </Button>
        </div>
        <div className="relative overflow-x-auto mt-4">
          {banners?.length > 0 ? (
            <Table className="bg-white relative shadow rounded-lg lg:w-full w-[900px] border-b border-r border-l">
              <TableHeader className="text-gray-800 uppercase bg-gray-100">
                <TableRow>
                  <TableHead className="px-6 py-3">ID</TableHead>
                  <TableHead className="px-6 py-3">Image</TableHead>
                  <TableHead className="px-6 py-3">Title</TableHead>
                  <TableHead className="px-6 py-3">Created On</TableHead>
                  <TableHead className="px-6 py-3">Updated On</TableHead>
                  <TableHead className="px-6 py-3"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banners &&
                  banners.length > 0 &&
                  banners.map((banner: TBanner, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="px-6 py-3">{index + 1}</TableCell>
                      <TableCell className="px-6 py-3">
                        <Image
                          src={banner.image.url || ""}
                          alt="banner-image"
                          width={80}
                          height={80}
                          priority={true}
                          className="rounded w-[80px] h-[80px] object-cover"
                        />
                      </TableCell>
                      <TableCell className="px-6 py-3">
                        {banner.title}
                      </TableCell>
                      <TableCell className="px-6 py-3">
                        {dayjs(banner.createdAt).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell className="px-6 py-3">
                        {dayjs(banner.updatedAt).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell className="space-x-4 px-6 py-3">
                        <button
                          onClick={() => handleEditBanner(banner)}
                          className="text-blue-600"
                        >
                          <SquarePen />
                        </button>
                        <button
                          onClick={() => handleDeleteBanner(banner)}
                          className="text-red-600"
                        >
                          <Trash2 />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <NoData />
          )}
        </div>
      </div>
      {createBanner.open && <CreateBannerModal />}
      {editBanner.open && (
        <EditBannerModal banner={selectBanner} setBanner={setSelectBanner} />
      )}
      {deleteBanner.open && <DeleteBannerModal banner={deleteBannerData} />}
    </>
  );
};

export default BannerTable;
