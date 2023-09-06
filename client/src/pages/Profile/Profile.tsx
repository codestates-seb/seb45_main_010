import ProfileTabs from 'components/Profile/ProfileTabs';
import ProfileHeader from 'components/Profile/ProfileHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import User from 'components/Type/User';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isteacher, setIsTeacher] = useState<boolean>(true);
  const userId = 'usMU8Hr';
  // const userId = 'yHPHHwR';

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await axios.get<User>(`http://localhost:8081/profile/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.log('UserData GET error', error);
      }
    };
    userData();
  }, [isteacher, userId]);

  return (
    <>
      {user ? (
        <>
          <ProfileHeader
            name={user.name}
            introduce={user.introduce}
            user={user}
            classMethod={{ onLine: user.classMethod.onLine, offLine: user.classMethod.offLine }}
          />
          <ProfileTabs
            requests={user.request}
            teacher={user.teacher}
            lectureFee={user.lectureFee}
            career={user.career}
            option={user.option}
            classMethod={{ onLine: user.classMethod.onLine, offLine: user.classMethod.offLine }}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Profile;
