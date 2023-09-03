import { Checkbox } from '@material-tailwind/react';
import { BsPencil } from 'react-icons/bs';
// import { TfiSave } from "react-icons/tfi";

export default function OptionList() {
  return (
    <div className="m-5">
      <p className="mb-5 text-sm font-bold ">강좌형식</p>
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
      <p className="mb-5 text-sm font-bold">강의료 ( 강사 소개에 노출됩니다 )</p>
      <ul>
        <li className="right-0 flex justify-end m-4">
          <BsPencil />
        </li>
        <li className="mx-4 mb-10 text-xs leading-5">
          강의료 입력 20자 이내 예)1시간 1인 50,000원
        </li>
      </ul>
      <p className="text-sm font-bold">학력 및 경력</p>
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
      <p className="text-sm font-bold">수업옵션</p>
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
    </div>
  );
}
