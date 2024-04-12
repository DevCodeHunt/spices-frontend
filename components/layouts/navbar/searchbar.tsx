import { Search } from "lucide-react";
import React from "react";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Searchbar: React.FC<Props> = ({ value, onChange }) => {

  return (
    <div className="relative h-10 border border-gray-300 rounded w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search..."
        className="w-[calc(100%_-_48px)] h-full px-2 text-gray-800 text-sm outline-0 font-medium rounded"
      />
      <button className="absolute top-1/2 -translate-y-1/2 right-2 border-l h-full w-10 flex items-center justify-center">
        <Search size={20} />
      </button>

      {value && value.length > 0 && (
        <div className="max-h-48 w-full absolute left-0 right-0 top-10 border rounded z-10 shadow bg-white overflow-y-auto scrollbar">
          <p className="text-xl">Lorem ipsum dolor sit.</p>
          <p className="text-xl">Lorem ipsum dolor sit.</p>
          <p className="text-xl">Lorem ipsum dolor sit.</p>
          <p className="text-xl">Lorem ipsum dolor sit.</p>
          <p className="text-xl">Lorem ipsum dolor sit.</p>
          <p className="text-xl">Lorem ipsum dolor sit.</p>
          <p className="text-xl">Lorem ipsum dolor sit.</p>
          <p className="text-xl">Lorem ipsum dolor sit.</p>
          <p className="text-xl">Lorem ipsum dolor sit.</p>
          <p className="text-xl">Lorem ipsum dolor sit.</p>
          <p className="text-xl">Lorem ipsum dolor sit.</p>
          <p className="text-xl">Lorem ipsum dolor sit.</p>
          <p className="text-xl">Lorem ipsum dolor sit.</p>
          <p className="text-xl">Lorem ipsum dolor sit.</p>
          <p className="text-xl">Lorem ipsum dolor sit.</p>
          <p className="text-xl">Lorem ipsum dolor sit.</p>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
