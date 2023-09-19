import ProfileTabs from 'components/Profile/ProfileTabs';
import ProfileHeader from 'components/Profile/ProfileHeader';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileType } from 'Types/Types';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { URL } from 'configs/Url/config';
import IsLoading from 'components/Loading/Loading';
import { updateOnline, updateOffline } from 'redux/thunk/ProfilePageThunk';

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

  const [loading, setLoading] = useState(true);
  const userDetails = useAppSelector((state) => state.member.user);
  const isAuthenticatedUser = useAppSelector((state) => state.auth.isAuthenticated);
  console.log(userDetails, isAuthenticatedUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticatedUser && !userDetails.id) {
      alert('로그인 후 이용하실 수 있으며 인증이 있으시면 자동로그인됩니다');
      navigate('/login');
      return;
    }
    const getUser = async () => {
      setLoading(true);
      if (userDetails) {
        const { id, teacher } = userDetails;

        const response = await axios.get(
          `${URL}/${teacher ? 'teachers' : 'students/mypage'}/${id}`
        );
        setUser(response.data);
        setLoading(false);
      }
    };

    getUser();
  }, [userDetails]);
  const dispatch = useAppDispatch();

  const updateOnlineStatus = async (newState: boolean) => {
    if (userDetails) {
      try {
        await dispatch(updateOnline({ id: userDetails.id, onLine: newState }));
      } catch (error) {
        console.error('Failed to update online status:', error);
      }
    }
    return console.log('11111');
  };

  const updateOfflineStatus = async (newState: boolean) => {
    if (userDetails) {
      try {
        await dispatch(updateOffline({ id: userDetails.id, offLine: newState }));
      } catch (error) {
        console.error('Failed to update offline status:', error);
      }
    }
  };

  if (loading) {
    return <IsLoading />;
  }

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
        onUpdateOnline={updateOnlineStatus}
        onUpdateOffline={updateOfflineStatus}
      />
    </>
  );
};

export default Profile;
