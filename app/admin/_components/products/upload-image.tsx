import Image from "next/image";
import React from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TImage } from "@/types";

type Props = {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  setUploadImages: React.Dispatch<React.SetStateAction<TImage[]>>;
};
const UploadProductImage: React.FC<Props> = ({
  images,
  setImages,
  setUploadImages,
}) => {
  const { toast } = useToast();

  const onDrop = React.useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const acceptedFilesTypes = ["svg", "png", "jpg", "jpeg"];

      acceptedFiles.filter((file: File) => {
        const fileExtension = file.name.split(".")[1];
        const filename = file.name.split(".")[0];

        if (!acceptedFilesTypes.includes(fileExtension.toLowerCase())) {
          toast({
            variant: "destructive",
            title: `File ${filename} is not a valid extension`,
            description:
              "Please select a valid extension for the file type like svg, png, jpg and jpeg and try again.",
          });
          return;
        }

        setImages((prevImages) => [...acceptedFiles, ...prevImages]);
      });
      const rejectedFiles = fileRejections.map(
        (fileRejection) => fileRejection.file
      );
    },
    [setImages, toast]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleReplaceImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files![0];
    if (file) {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = file;
        return newImages;
      });
    }
  };

  const handleUpload = () => {
    console.log(images);
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
              <span className="font-semibold text-center">Click to upload</span> or drag and
              drop
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
            {images.map((obj, i) => (
              <div key={i} className="relative rounded w-[150px] h-[150px]">
                <Image
                  src={URL.createObjectURL(obj)}
                  alt="image"
                  width={150}
                  height={150}
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
                      onChange={(event) => handleReplaceImage(event, i)}
                    />
                  </label>
                  <button
                    onClick={() => {
                      setImages((prevImages) =>
                        prevImages.filter((image, index) => index !== i)
                      );
                    }}
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleUpload} type="button">
              Upload
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadProductImage;
