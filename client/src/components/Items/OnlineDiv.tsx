const OnlineDiv = ({ onoff }: { onoff: string }) => {
  return (
    <div className="flex items-center justify-center text-sm rounded-lg h-[35px] w-auto p-3 bg-mint-300">
      {onoff}
    </div>
  );
};

export default OnlineDiv;
