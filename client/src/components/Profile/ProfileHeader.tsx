import { Button } from '@material-tailwind/react';
import { BsPencil } from 'react-icons/bs';
import userExampleImage from '../../assets/Image/user-example.png';
import ProfileDropdown from './ProfileDropdown';


export default function ProfileHeader({ name, introduce }: { name: string; introduce: string }) {
  const category = {
    subject: ['수학', '과학', '외국어', '국사', '사회'],
    area: ['서울', '강서', '강원', '강남', '강북', '충북', '제주'],
  };
  return (
    <div className="m-5 my-10">
      <div>
        <div className="flex flex-row items-center gap-6 mb-10">
          <img
            src={userExampleImage}
            className="border rounded-full w-14 h-14 border-mint-2"
            alt="프로필이미지"
          ></img>
          <div className="flex flex-col gap-2">
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
        <li className="right-0 flex justify-end m-5">
          <BsPencil />
        </li>
        <li className="mx-4 text-xs leading-5 min-h-[100px]">{introduce}</li>
      </ul>
      <div className="mt-10 border-b-2 border-grey-1"></div>
    </div>
  );
}
