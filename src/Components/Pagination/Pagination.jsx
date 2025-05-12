import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange, onNextPage, onPreviousPage }) => {
  
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-end space-x-2 pagination">
      {/* زر السابق */}
      <button
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400"
      >
        <ChevronLeft size={18}/>
      </button>

      {/* أرقام الصفحات */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`w-10 h-10 rounded-md border ${
            currentPage === number
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </button>
      ))}

      {/* زر التالي */}
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;







// import React from 'react';
// import { ChevronLeft, ChevronRight } from "lucide-react";


// const Pagination = ({ currentPage, totalPages, onPageChange, onNextPage, onPreviousPage }) => {
  
//   const handlePageClick = (page) => {
//     onPageChange(page);
//   };

//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="flex items-center justify-end space-x-2 pagination">
//       {/* زرار السابق */}
     
//       <button
//         onClick={onPreviousPage}
//         disabled={currentPage === 1}
//         className="flex items-center justify-center w-10 h-10 text-white bg-gray-800 rounded-md hover:bg-gray-700 disabled:bg-gray-500 "
//       >
//         <ChevronLeft size={18}/>
//       </button>
  

//       {/* أرقام الصفحات */}
//       {pageNumbers.map((number) => (
//         <button
//           key={number}
//           className={`page-button  ${currentPage === number ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-md w-10 h-10`}
//           onClick={() => handlePageClick(number)}
//         >
//           {number}
//         </button>
//       ))}

//       {/* زرار التالي */}
//       <button
//         onClick={onNextPage}
//         disabled={currentPage === totalPages}
//         className="flex items-center justify-center w-10 h-10 text-white bg-gray-800 rounded-md hover:bg-gray-700 disabled:bg-gray-500 "
//       >
//        <ChevronRight size={18} />
//       </button>
//     </div>
//   );
// };

// export default Pagination;
