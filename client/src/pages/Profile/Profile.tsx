import ProfileTabs from 'components/Profile/ProfileTabs';
import ProfileHeader from 'components/Profile/ProfileHeader';
import { useEffect } from 'react';
import { FetchProfile } from 'redux/thunk/ProfilePageThunk';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { authenticateUser } from 'redux/slice/OauthSlice';

const Profile = () => {
  const dispatch = useAppDispatch();

  // const userDetails = useAppSelector((state) => state.auth);
  // const userId = userDetails.id;

  useEffect(() => {
    dispatch(FetchProfile())
      .then((response) => {
        console.log('Profile fetched successfully:', response);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  const user = useAppSelector((state) => state.profile.value);
  // console.log(user.teacher);
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
