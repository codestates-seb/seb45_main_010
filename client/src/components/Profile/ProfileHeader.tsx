import { Button } from '@material-tailwind/react';
import { BsPencil } from 'react-icons/bs';
import userExampleImage from '../../assets/Image/user-example.png';
import ProfileDropdown from './ProfileDropdown';

export default function ProfileHeader() {
  return (
    <div className="m-5 my-10">
      <div>
        <div className="flex flex-row items-center gap-6">
          <img
            src={userExampleImage}
            className="w-12 h-12 border rounded-full border-mint-2"
            alt="프로필이미지"
          ></img>
          <p className="text-2xl align-middle">홍길동</p>
        </div>
        <div className="flex flex-row gap-4 mt-5 mb-10">
          <Button className="h-8 font-normal text-black w-25 bg-mint-2 rounded-xl" size="sm">
            개인정보변경
          </Button>
        </div>
      </div>
      <ProfileDropdown />
      <ProfileDropdown />
      <ul>
        <div className="right-0 flex justify-end m-4">
          <BsPencil />
        </div>
        <p className="mx-4 text-xs leading-5">
          저는 서울대학교 수학과를 졸업했으며, 10년 이상 입시 학원 및 개인 지도를 해온 경력을 가지고
          있습니다. 초등 및 중학수학을 비롯한 수학의 기초다지기, 고등수학 및 심화학습, 내신 대비,
          수능시험을 준비를 위한 타켓 수업등을 폭넓게 진행하고 있습니다.
        </p>
      </ul>
      <div className="mt-10 border-b-2 border-grey-1"></div>
    </div>
  );
}
