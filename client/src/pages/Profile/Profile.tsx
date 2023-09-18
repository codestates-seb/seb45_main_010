import ProfileTabs from 'components/Profile/ProfileTabs';
import ProfileHeader from 'components/Profile/ProfileHeader';
import { useEffect } from 'react';
import { FetchProfile } from 'redux/thunk/ProfilePageThunk';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import GetInfoAuth from 'components/Items/GetInfoAuth';

const Profile = () => {
  const dispatch = useAppDispatch();
  const profileState = useAppSelector((state) => state.profile);

  const { userId } = GetInfoAuth();
  // const id = 2;
  const user = profileState.value;
  useEffect(() => {
    if (userId !== null)
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
