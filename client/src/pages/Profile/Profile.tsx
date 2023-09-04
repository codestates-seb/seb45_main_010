import ProfileTabs from 'components/Profile/ProfileTabs';
import ProfileHeader from 'components/Profile/ProfileHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from 'components/Type/User';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  // const [job, setJob] = useState<'teachers' | 'students'>('teachers');
  // const userId = 'WhZZ1ec';
  const userId = 'yHPHHwR';
  const job = 'students';

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await axios.get<User>(`http://localhost:8081/${job}/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.log('UserData GET error', error);
      }
    };
    userData();
  }, [job, userId]);

  return (
    <>
      {user ? (
        <>
          <ProfileHeader name={user.name} introduce={user.introduce} user={user} />
          <ProfileTabs requests={user.request} job={job} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Profile;
