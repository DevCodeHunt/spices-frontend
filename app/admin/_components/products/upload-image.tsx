import Image from "next/image";
import React from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { axiosPrivate } from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addImages,
  deleteImages,
  ProductState,
  replaceImages,
} from "@/redux/slices/productSlice";
import { TImage } from "@/types";

const UploadProductImage = () => {
  const { images } = useAppSelector(ProductState);
  const dispatch = useAppDispatch();
  const onDrop = React.useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const acceptedFilesTypes = ["svg", "png", "jpg", "jpeg"];

      acceptedFiles.filter((file: File) => {
        const fileExtension = file.name.split(".")[1];
        const filename = file.name.split(".")[0];

        if (!acceptedFilesTypes.includes(fileExtension.toLowerCase())) {
          toast.error(
            "Please select a valid extension for the file type like svg, png, jpg and jpeg and try again."
          );
          return;
        }
      });
      const loading = toast.loading("Uploading...");
      try {
        const formData = new FormData();
        acceptedFiles.forEach((image) => {
          formData.append("images", image);
        });
        const response = await axiosPrivate.post(
          "/admin/products/upload-product-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Product image uploaded successfully");
        dispatch(addImages(response.data));
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      } finally {
        toast.dismiss(loading);
      }
      const rejectedFiles = fileRejections.map(
        (fileRejection) => fileRejection.file
      );
    },
    [dispatch]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleReplaceImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
    index: number
  ) => {
    const file = event.target.files![0];
    if (file) {
      const loading = toast.loading("Replacing...");
      try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("imageId", id);
        const response = await axiosPrivate.post(
          "/admin/products/replace-product-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Product image replaced successfully");
        dispatch(
          replaceImages({
            index: index,
            image: response.data,
          })
        );
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      } finally {
        toast.dismiss(loading);
      }
    }
  };

  const handleDeleteImage = async (index: number, id: string) => {
    const loading = toast.loading("Deleting...");
    try {
      await axiosPrivate.post("/admin/products/delete-product-image", {
        imageId: id,
      });
      toast.success("Product image deleted successfully");
      dispatch(
        deleteImages({
          index: index,
        })
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <div>
      <p className="text-lg font-semibold text-gray-800">Product Image</p>
      <div className="flex items-center justify-center w-full mt-4">
        <label
          {...getRootProps()}
          onClick={(e) => e.stopPropagation()}
          htmlFor="images"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 text-center">
              <span className="font-semibold text-center">Click to upload</span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or JPEG</p>
          </div>
          <input
            {...getInputProps()}
            multiple
            id="images"
            type="file"
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>

      {images && images?.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2 mt-4">
            {images.map((obj: TImage, i) => (
              <div key={i} className="relative rounded w-[150px] h-[150px]">
                <Image
                  src={obj.url}
                  alt="image"
                  width={150}
                  height={150}
                  priority={true}
                  className="rounded object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/10 text-white rounded flex items-center justify-center gap-2">
                  <label htmlFor="file">
                    <SquarePen className="cursor-pointer" />
                    <input
                      id="file"
                      type="file"
                      hidden
                      accept=".png, .jpg, .jpeg, .svg"
                      onChange={(event) =>
                        handleReplaceImage(event, obj?.id, i)
                      }
                    />
                  </label>
                  <button
                    onClick={() => handleDeleteImage(i, obj?.id)}
                    // onClick={() => {
                    //   setImages((prevImages) =>
                    //     prevImages.filter((image, index) => index !== i)
                    //   );
                    // }}
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
        </>
      )}
    </div>
  );
};

export default UploadProductImage;
