import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Checkbox,
  Button,
} from '@material-tailwind/react';
import { BsPencil, BsChevronDown } from 'react-icons/bs';
// import { PiNoteLight, PiUserLight } from 'react-icons/pi';
// import { CiCalendarDate } from 'react-icons/ci';

export default function ProfileBody() {
  const data = [
    {
      label: '내 강의 조회',
      value: '내 강의 조회',
      id: 1,
      desc: <LectureList key="lecture" />,
    },
    {
      label: '스케쥴 관리',
      value: '스케쥴 관리',
      id: 2,
      desc: <ScheduleList key="schedule" />,
    },
    {
      label: 'Profile 관리',
      value: 'Profile 관리',
      id: 3,
      desc: <OptionList key="profile" />,
    },
  ];

  return (
    <Tabs value="내 강의 조회">
      <TabsHeader className="mx-5 mb-5 bg-mint-2">
        {data.map((value) => (
          <Tab className="font-semibold" key={value.id} value={value.value}>
            {value.value}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="text-inherit">
        {data.map((value) => (
          <>
            <TabPanel className="font-normal text-black" key={value.id} value={value.value}>
              {value.desc}
            </TabPanel>
          </>
        ))}
      </TabsBody>
    </Tabs>
  );
}

export function LectureList() {
  return (
    <div className="flex flex-col flex-wrap">
      <p className="flex-1 mx-5 mb-5 text-sm font-bold">강의요청목록</p>
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

export function ScheduleList() {
  return (
    <>
      <p className="mx-5 mb-5 text-sm font-bold">수업가능 일정설정</p>
      <div className="flex flex-col items-center justify-center gap-5">
        <Button
          className="flex items-center justify-between p-2 text-sm font-bold text-black bg-mint-4 rounded-xl w-[230px] border-mint-2"
          size="sm"
        >
          <span className="flex-1 text-center">날짜 선택</span>
          <BsChevronDown className="ml-auto" />
        </Button>
        <div className="h-[150px] w-[230px] bg-mint-4">달력 자리</div>
        <div>
          <Button
            className="mb-5 flex items-center justify-between p-2 text-sm font-bold text-black bg-mint-2 rounded-xl w-[230px] border-mint-2"
            size="sm"
          >
            <span className="flex-1 text-center">17:00 ~ 18:00</span>
          </Button>
          <Button
            className="flex items-center justify-between p-2 text-sm font-bold text-black bg-mint-2 rounded-xl w-[230px] border-mint-2"
            size="sm"
          >
            <span className="flex-1 text-center">18:00 ~ 19:00</span>
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center my-5">
        <Button
          className="flex items-center justify-between p-2 my-5 text-sm font-bold text-white bg-blue-1 rounded-xl w-[98px] "
          size="sm"
        >
          <span className="flex-1 text-center">저장</span>
        </Button>
      </div>
    </>
  );
}

export function OptionList() {
  return (
    <>
      <p className="mx-5 mb-5 text-sm font-bold">강좌형식</p>
      <div className="flex flex-row items-center gap-1 mt-5 mb-10">
        <Checkbox
          color="green"
          className="text-green bg-green"
          defaultChecked
          crossOrigin="anonymous"
        />
        <div className="flex items-center justify-center text-sm rounded-lg h-[35px] w-[63px] bg-mint-2">
          온라인
        </div>
        <Checkbox color="green" className="text-green bg-green" crossOrigin="anonymous" />
        <div className="flex items-center justify-center text-sm rounded-lg h-[35px] w-[68px] bg-mint-2">
          오프라인
        </div>
      </div>
      <p className="mx-5 mb-5 text-sm font-bold">강의료 ( 강사 소개에 노출됩니다 )</p>
      <ul>
        <li className="right-0 flex justify-end m-4">
          <BsPencil />
        </li>
        <li className="mx-4 mb-10 text-xs leading-5">
          강의료 입력 20자 이내 예)1시간 1인 50,000원
        </li>
      </ul>
      <p className="mx-5 text-sm font-bold">학력 및 경력</p>
      <ul>
        <li className="right-0 flex justify-end m-4">
          <BsPencil />
        </li>
        <li className="mx-4 mb-10 text-xs leading-5">
          서울대학교 수학과를 졸업하였으며, 통계 및 해석학 부분의 석사학위를 받았습니다. 현재는 박사
          과정을 진행하고 있습니다. 엠베스트 중학수학 부분의 강의를 진행하였으며, 공통수학과
          미적분에 대한 보조강의도 진행하였습니다. ‘태풍’ 학원의 대치점과 목동점에서 2년간 고3 수능
          만점반의 강의를 진행했습니다. 이외에도 다수의 개인과외 경험이 있습니다.
        </li>
      </ul>
      <p className="mx-5 text-sm font-bold">수업옵션</p>
      <ul>
        <li className="right-0 flex justify-end m-4">
          <BsPencil />
        </li>
        <li className="mx-4 mb-10 text-xs leading-5">
          초등학생, 중학생 기초 수업은 내신 진행시 1회 3시간으로 수업하며 9시 이후에는 수업하지
          않습니다. 레벨 테스트는 무료로 진행합니다. 고3의 수능대비반의 경우는 타켓 수업(족집게
          문제풀이)이 별도로 이루어지며, 시간당 2만원의 추가비용이 있습니다. (교재제공) 물리 수업은
          팀으로 진행하며, 현재 진행중인 팀에 합류하기 위해서는 별도의 테스트를 진행하여야 합니다.
          테스틑 비용이 있으며 수강시에 수강료에 산입하여 정산하여 드립니다.
        </li>
      </ul>
    </>
  );
}
