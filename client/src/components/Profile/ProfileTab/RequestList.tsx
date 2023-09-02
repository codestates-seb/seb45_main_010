import { Button } from '@material-tailwind/react';

export default function RequestList() {
  return (
    <div className="flex flex-col flex-wrap">
      <p className="flex-1 mx-5 mb-4 text-sm font-bold">강의요청목록</p>
      <div className="flex justify-end text-right">
        <Button
          className="flex items-center mx-1 h-7 p-2 text-[8px] text-gray-700 bg-white rounded-xl border-mint-2"
          variant="outlined"
        >
          과목
        </Button>
        <Button
          className="flex items-center mx-1 h-7 p-2 text-[8px] text-gray-700 bg-white rounded-xl border-mint-2"
          variant="outlined"
        >
          학생
        </Button>
      </div>
      <div className="my-5 border rounded-lg w-320 bg-[#BEDEF1] border-[#BEDEF1] cursor-pointer hover:bg-blue-1 hover:border-blue-1 duration-300">
        <div className="flex flex-row items-center justify-between p-4">
          <div className="text-[16px] font-semibold">수업요청</div>
          <div className="flex h-6 text-sm font-normal bg-white rounded-md">
            <div className="flex items-center justify-center flex-1 p-2">수학</div>
            <div className="flex items-center justify-center flex-1 w-20 p-2">홍길동</div>
          </div>
        </div>
        <div className="flex justify-end p-4 text-right">
          <div>2023.09.01</div>
        </div>
      </div>
      <div className="my-5 border rounded-lg w-320  bg-mint-2 border-[#BEDEF1] hover:bg-grey-1 duration-300">
        <div className="flex flex-row items-center justify-between p-4">
          <div className="text-[16px] font-semibold">답변완료</div>
          <div className="flex h-6 text-sm font-normal bg-white rounded-md">
            <div className="flex items-center justify-center flex-1 p-2">수학</div>
            <div className="flex items-center justify-center flex-1 w-20 p-2">홍길동</div>
          </div>
        </div>
        <div className="flex justify-end p-4 text-right">
          <div>2023.09.01</div>
        </div>
      </div>
      <div className="my-5 border rounded-lg w-320  bg-mint-2 border-[#BEDEF1] hover:bg-grey-1 duration-300">
        <div className="flex flex-row items-center justify-between p-4">
          <div className="text-[16px] font-semibold">취소완료</div>
          <div className="flex h-6 text-sm font-normal bg-white rounded-md">
            <div className="flex items-center justify-center flex-1 p-2">과학</div>
            <div className="flex items-center justify-center flex-1 w-20 p-2">홍길동</div>
          </div>
        </div>
        <div className="flex justify-end p-4 text-right">
          <div>2023.09.01</div>
        </div>
      </div>
    </div>
  );
}
