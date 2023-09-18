import ProfileTabs from 'components/Profile/ProfileTabs';
import ProfileHeader from 'components/Profile/ProfileHeader';
import { useEffect, useState } from 'react';
import { ProfileType, MatchType } from 'Types/Types';
import axios from 'axios';
import { useAppSelector } from 'hooks/hooks';
import { URL } from 'configs/Url/config';

const Profile = () => {
  const [user, setUser] = useState<ProfileType>({
    career: '',
    email: '',
    teacher: false,
    userId: 0,
    id: 0,
    introduction: '',
    lectureFee: '',
    name: '',
    offLine: false,
    onLine: false,
    option: '',
    profileImg: '',
    regions: [],
    subjects: [],
    matches: [
      {
        matchId: 0,
        date: '',
        timeslot: '',
        status: '',
        studentName: '',
        subjects: [],
        teacherName: '',
      },
    ],
  });
  const userDetails = useAppSelector((state) => state.member.user);
  useEffect(() => {
    const getUser = async () => {
      if (userDetails) {
        const { id, teacher } = userDetails;
        const response = await axios.get(
          `${URL}/${teacher ? 'teachers' : 'students/mypage'}/${id}`
        );
        setUser(response.data);
      }
    };

    getUser();
  }, [userDetails]);
  return (
    <>
      <ProfileHeader
        name={user.name}
        introduction={user.introduction}
        id={user.id}
        profileImg={user.profileImg}
        subjects={user.subjects}
        regions={user.regions}
        onLine={user.onLine}
        offLine={user.offLine}
        teacher={user.teacher}
      />
      <ProfileTabs
        id={user.id}
        matches={user.matches}
        teacher={user.teacher}
        lectureFee={user.lectureFee}
        career={user.career}
        option={user.option}
        onLine={user.onLine}
        offLine={user.offLine}
      />
    </>
  );
};

export default Profile;
