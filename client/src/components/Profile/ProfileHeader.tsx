import { Button } from '@material-tailwind/react';
import { BsPencil } from 'react-icons/bs';
import userExampleImage from '../../assets/Image/user-example.png';
import ProfileDropdown from './ProfileDropdown';

export default function ProfileHeader({ name }: { name: string }) {
  const category = {
    subject: ['수학', '과학', '외국어', '국사', '사회'],
    area: ['서울', '강서', '강원', '강남', '강북', '충북', '제주'],
  };
  return (
    <div className="m-5 my-10">
      <div>
        <div className="flex flex-row items-center gap-6">
          <img
            src={userExampleImage}
            className="border rounded-full w-14 h-14 border-mint-2"
            alt="프로필이미지"
          ></img>
          <div className="flex flex-col gap-2 mt-5 mb-5">
            <p className="ml-3 text-2xl">{name}</p>
            <Button
              className="font-normal text-black w-[100px] ml-3 bg-mint-2 rounded-xl"
              size="sm"
            >
              개인정보변경
            </Button>
          </div>
        </div>
      </div>
      <ProfileDropdown title="과목" selections={category.subject} />
      <ProfileDropdown title="지역" selections={category.area} />
      <ul>
        <li className="right-0 flex justify-end m-4">
          <BsPencil />
        </li>
        <li className="mx-4 text-xs leading-5">
          저는 서울대학교 수학과를 졸업했으며, 10년 이상 입시 학원 및 개인 지도를 해온 경력을 가지고
          있습니다. 초등 및 중학수학을 비롯한 수학의 기초다지기, 고등수학 및 심화학습, 내신 대비,
          수능시험을 준비를 위한 타켓 수업등을 폭넓게 진행하고 있습니다.
        </li>
      </ul>
      <div className="mt-10 border-b-2 border-grey-1"></div>
    </div>
  );
}
