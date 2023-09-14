import ProfileTabs from 'components/Profile/ProfileTabs';
import ProfileHeader from 'components/Profile/ProfileHeader';
import { useEffect } from 'react';
import { FetchProfile } from 'redux/thunk/ProfilePageThunk';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import UseCheckAuth from 'hooks/UseCheckAuth';

const Profile = () => {
  const dispatch = useAppDispatch();
  const profileState = useAppSelector((state) => state.profile);

  const userId = UseCheckAuth();
  // const id = 2;
  const user = profileState.value;

  useEffect(() => {
    dispatch(FetchProfile(userId))
      .then((response) => {
        console.log('Profile fetched successfully:', response);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, [userId]);
  return (
    <>
      <ProfileHeader
        name={user.name}
        introduction={user.introduction}
        id={userId}
        profileImg={user.profileImg}
        subjects={user.subjects}
        regions={user.regions}
        onLine={user.onLine}
        offLine={user.offLine}
        teacher={user.teacher}
      />
      <ProfileTabs
        id={userId}
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
