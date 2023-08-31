import React from 'react';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
// import { PiNoteLight, PiUserLight } from 'react-icons/pi';
// import { CiCalendarDate } from 'react-icons/ci';

export default function ProfileBody() {
  const data = [
    {
      label: '내 강의 조회',
      value: '내 강의 조회',
      desc: <LectureList />,
    },
    {
      label: '스케쥴 관리',
      value: '스케쥴 관리',
      desc: `수업가능 일정설정`,
    },
    {
      label: 'Profile 관리',
      value: 'Profile 관리',
      desc: `강좌형식 / 강의료(강사 소개에 노출됩니다) / 학력 및 경력 / 수업옵션`,
    },
  ];

  return (
    <Tabs value="내 강의 조회">
      <TabsHeader className="mx-5 bg-mint-2">
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="text-inherit">
        {data.map(({ value, desc }) => (
          <>
            <TabPanel className="font-normal text-black" key={value} value={value}>
              {desc}
            </TabPanel>
            <div className="mt-10 border-b-2 border-grey-1"></div>
          </>
        ))}
      </TabsBody>
    </Tabs>
  );
}

export function LectureList() {
  return (
    <div className="flex flex-col flex-wrap">
      <div className="flex flex-row justify-between mx-5 my-2 text-sm font-medium">
        <p className="flex-1">강의요청목록</p>
        <div className="flex text-xs border border-grey border-1">
          <div>과목</div>
          <div>학생</div>
        </div>
      </div>
      <div className="my-5 border rounded-lg w-320 bg-[#BEDEF1] border-[#BEDEF1] hover:bg-blue-1 hover:border-blue-1 duration-300">
        <div className="flex flex-row items-center justify-between p-4">
          <div className="text-[16px] font-semibold">수업요청</div>
          <div className="flex h-6 text-xs font-semibold bg-white rounded-md">
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
          <div className="flex h-6 text-xs font-semibold bg-white rounded-md">
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
          <div className="flex h-6 text-xs font-semibold bg-white rounded-md">
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
