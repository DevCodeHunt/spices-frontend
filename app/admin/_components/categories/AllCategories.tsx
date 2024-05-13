"use client";

import React, { useState } from "react";
import TableSerach from "../TableSerach";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddCategoryModal from "./AddCategoryModal";
import useAddCategoryStore from "@/store/addCategoryStore";

const AllCategories = () => {
    const addCategoryStore = useAddCategoryStore()
  const [searchTerm, setSearchTerm] = useState("");
  const onSerachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <div className="flex sm:flex-row flex-col-reverse md:items-center md:justify-between gap-4 mt-8">
        <div className="md:max-w-md w-full">
          <TableSerach value={searchTerm} onChange={onSerachChange} />
        </div>
        <Button onClick={addCategoryStore.onOpen} type="button">
          <Plus className="w-4 h-4 mr-2" />
          Add new category
        </Button>
      </div>

      <AddCategoryModal />
    </>
  );
};

export default AllCategories;
