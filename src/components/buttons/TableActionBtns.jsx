import React from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

const TableActionBtns = ({
  id,
  setId,
  setEditModalOpen,
  setDeleteModalOpen,
}) => {
  return (
    <div className="flex justify-center items-center gap-x-2">
      <BiEdit
        className="text-[1.2rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer hover:text-[green] transition-all duration-500"
        onClick={() => {
          setId(id);
          setEditModalOpen(true);
        }}
      />
      <RiDeleteBin5Line
        className="text-[1.2rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer hover:text-[red] transition-all duration-500"
        onClick={() => {
          setId(id);
          setDeleteModalOpen(true);
        }}
      />
    </div>
  );
};

export default TableActionBtns;
