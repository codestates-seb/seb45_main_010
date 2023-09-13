import ProfileTabs from 'components/Profile/ProfileTabs';
import ProfileHeader from 'components/Profile/ProfileHeader';
import { useEffect } from 'react';
import { FetchProfile, updateClassMethod } from 'redux/thunk/Thunk';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';

const Profile = () => {
  const dispatch = useAppDispatch();
  const profileState = useAppSelector((state) => state.profile);
  const requestState = useAppSelector((state) => state.request);
  const handleClassMethodUpdate = (onLine: boolean, offLine: boolean) => {
    dispatch(updateClassMethod({ userId, onLine, offLine }));
  };
  const userId = 1;
  // const userId = 2;
  const user = profileState.value;
  const request = requestState.value;

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
            introduce={user.introduce}
            user={user}
            classMethod={{
              onLine: user.classMethod.onLine,
              offLine: user.classMethod.offLine,
            }}
          />
          <ProfileTabs
            userId={user.id}
            requests={request}
            teacher={user.teacher}
            lectureFee={user.lectureFee}
            career={user.career}
            option={user.option}
            classMethod={{
              onLine: user.classMethod.onLine,
              offLine: user.classMethod.offLine,
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
