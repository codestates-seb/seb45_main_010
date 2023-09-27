const IsLoading = () => {
  return (
    <div className="flex justify-center items-center height 100vh">
      <div className="flex flex-col items-center">
        <div className="border-8 border-t-8 rounded-full border-t-indigo-900 w-[50px] h-[50px] animate-spin"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default IsLoading;
