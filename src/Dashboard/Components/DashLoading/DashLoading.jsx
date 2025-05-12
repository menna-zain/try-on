const DashLoading = () => {
    return (
        <>
        <div className="flex items-center justify-center h-96">
      <div className="relative w-10 h-10 mx-auto my-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-700 rounded-full opacity-60 animate-bounce-scale"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gray-700 opacity-60 animate-bounce-scale delay-[1s]"></div>
      </div>
      </div>
      </>
    );
  };
  
  export default DashLoading;
  