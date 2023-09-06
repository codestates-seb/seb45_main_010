import { Button } from '@material-tailwind/react';
import userExampleImage from '../../assets/Image/user-example.png';
import ProfileDropdown from './ProfileDropdown';
import { Link } from 'react-router-dom';
import { User } from 'components/Types/User';

type ProfileHeaderProps = {
  name: string;
  introduce: string;
  user: User;
  classMethod: {
    onLine: boolean;
    offLine: boolean;
  };
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  introduce,
  user,
  classMethod = { onLine: false, offLine: false },
}) => {
  const { onLine, offLine } = classMethod;
  const category = {
    subject: ['수학', '과학', '외국어', '국사', '사회'],
    area: ['서울', '강서', '강원', '강남', '강북', '충북', '제주'],
  };
  return (
    <div className="p-4 py-10">
      <>
        <div className="flex flex-row items-center gap-6 mb-10">
          <img
            src={userExampleImage}
            className="border rounded-full w-14 h-14 border-mint-2"
            alt="프로필이미지"
          ></img>
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-2xl">{name}</p>
              <Link to={'/Private'}>
                <Button
                  className="font-normal text-black w-[100px] relative bg-mint-2 rounded-xl"
                  size="sm"
                >
                  개인정보변경
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-5 my-10">
          {onLine ? <OnlineDiv onoff="온라인" /> : null}
          {offLine ? <OnlineDiv onoff="오프라인" /> : null}
        </div>
      </>
      <ProfileDropdown title="과목" selections={category.subject} categories={user.category} />
      <ProfileDropdown title="지역" selections={category.area} categories={user.area} />
      <Option optionDesc={introduce} />
      <div className="mt-10 border-b-2 border-gray-1"></div>
    </div>
  );
};

export default ProfileHeader;
