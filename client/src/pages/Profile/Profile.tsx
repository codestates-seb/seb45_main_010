import ProfileTabs from 'components/Profile/ProfileTabs';
import ProfileHeader from 'components/Profile/ProfileHeader';
import { useEffect } from 'react';
import { FetchProfile, updateOnline, updateOffline } from 'redux/thunk/Thunk';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';

const Profile = () => {
  const dispatch = useAppDispatch();
  const profileState = useAppSelector((state) => state.profile);

  const id = 1;
  // const id = 2;
  const user = profileState.value;

  useEffect(() => {
    dispatch(FetchProfile(id))
      .then((response) => {
        console.log('Profile fetched successfully:', response);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, [dispatch, id]);

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
      />
      <ProfileTabs
        id={user.id}
        // requests={request}
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
