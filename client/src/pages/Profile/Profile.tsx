import ProfileTabs from 'components/Profile/ProfileTabs';
import ProfileHeader from 'components/Profile/ProfileHeader';
import { useEffect } from 'react';
import { FetchProfile, updateOnline, updateOffline } from 'redux/thunk/Thunk';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';

const Profile = () => {
  const dispatch = useAppDispatch();
  const profileState = useAppSelector((state) => state.profile);

  const handleClassMethodUpdate = (onLine?: boolean, offLine?: boolean) => {
    if (onLine !== undefined) {
      dispatch(updateOnline({ userId, onLine })).then(() => dispatch(FetchProfile(userId)));
    }
    if (offLine !== undefined) {
      dispatch(updateOffline({ userId, offLine })).then(() => dispatch(FetchProfile(userId)));
    }
  };
  const userId = 1;
  // const userId = 2;
  const user = profileState.value;

  useEffect(() => {
    dispatch(FetchProfile(userId))
      .then((response) => {
        console.log('Profile fetched successfully:', response);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, [dispatch, userId]);

  return (
    <>
      {user ? (
        <>
          <ProfileHeader
            name={user.name}
            introduction={user.introduction}
            user={user.id}
            classMethod={{
              onLine: user.onLine,
              offLine: user.offLine,
            }}
          />
          <ProfileTabs
            userId={user.id}
            // requests={request}
            teacher={user.teacher}
            lectureFee={user.lectureFee}
            career={user.career}
            option={user.option}
            classMethod={{
              onLine: user.onLine,
              offLine: user.offLine,
            }}
            handleClassMethodUpdate={handleClassMethodUpdate}
          />
        </>
      ) : profileState.status === 'pending' ? (
        <div>Loading...</div>
      ) : (
        <div>Error loading data</div>
      )}
    </>
  );
};

export default Profile;
