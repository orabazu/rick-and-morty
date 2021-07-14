import React, { useEffect } from "react";
import { useCharacterContext } from "../contexts/characterContext";
import RightArrow from '../assets/right-arrow.svg'
import LeftArrow from '../assets/left-arrow.svg'

export type Props = {
  currentPage: number;
  onPageChange: () => void;
};

const Pagination: React.FC<Props> = ({ currentPage, onPageChange }) => {
  const [characterState] = useCharacterContext();

  return (
    <div className="h-8 font-medium">
      <div className="flex fixed right-0 bottom-0 top-0 
      bg-gradient-to-r from-transparent to-pink-500 w-24 cursor-pointer">
        <img src={RightArrow} alt="Arrow"/>
      </div>
      <div className="flex fixed left-0 bottom-0 top-0 
      bg-gradient-to-l from-transparent to-pink-500 w-24 cursor-pointer">
        <img src={LeftArrow} alt="Arrow"/>
      </div>
    </div>
  );

  // return (

  //     <div
  //       onClick={onPageChange}
  //       className="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent"
  //     >
  //       1
  //     </div>
  //     <div className="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-orange-600  ">
  //       2
  //     </div>
  // );
};

export default Pagination;