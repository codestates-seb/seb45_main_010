import { Button } from '@material-tailwind/react';
import userExampleImage from '/assets/Image/user-example.png';
import ProfileDropdown from './ProfileDropdown';
import { Link } from 'react-router-dom';
import OnlineDiv from 'components/Items/OnlineDiv';
import Option from './ProfileTab/Option';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useEffect } from 'react';
import { FetchSubjects, FetchRegions } from 'redux/thunk/ProfilePageThunk';

type ProfileHeaderProps = {
  name: string;
  introduction: string;
  id: number;
  profileImg: string;
  onLine: boolean;
  offLine: boolean;
  subjects: string[];
  regions: string[];
  teacher: boolean;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  introduction,
  id,
  profileImg,
  onLine,
  offLine,
  subjects,
  regions,
  teacher,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FetchRegions());
    dispatch(FetchSubjects());
  }, []);

  const subjectsList = useAppSelector((state) => state.categories.value.subjects);
  const regionsList = useAppSelector((state) => state.categories.value.regions);

  const subjectArray = subjectsList.map((subject) => subject.subjectName);
  const regionArray = regionsList.map((region) => region.regionName);

  return (
    <div className="p-4 py-10">
      <>
        <div className="flex flex-row items-center gap-6 mb-10">
          <img
            src={profileImg ? profileImg : userExampleImage}
            className="border rounded-full w-14 h-14 border-mint-2"
            alt="프로필이미지"
          ></img>
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-2xl">{name}</p>
              <Link to={'/Private'}>
                <Button
                  className="font-normal text-black w-[100px] relative bg-mint-200 rounded-xl"
                  size="sm"
                >
                  개인정보변경
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {teacher ? (
          <div className="flex justify-end gap-5 my-10">
            {onLine ? <OnlineDiv onoff="온라인" /> : null}
            {offLine ? <OnlineDiv onoff="오프라인" /> : null}
          </div>
        ) : null}
      </>
      <ProfileDropdown
        title="과목"
        selections={subjectArray}
        categories={subjects}
        id={id}
        teacher={teacher}
      />
      <ProfileDropdown
        title="지역"
        selections={regionArray}
        categories={regions}
        id={id}
        teacher={teacher}
      />
      <Option optionDesc={introduction} id={id} teacher={teacher} />
      <div className="mt-10 border-b-2 border-gray-1"></div>
    </div>
  );
};

export default ProfileHeader;
