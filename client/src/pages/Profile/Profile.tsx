import ProfileTabs from 'components/Profile/ProfileTabs';
import ProfileHeader from 'components/Profile/ProfileHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from 'components/Type/User';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [lectureFee, setLectureFee] = useState<string>('');
  const [career, setCareer] = useState<string>('');
  const [option, setOption] = useState<string>('');
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

  useEffect(() => {
    if (user) {
      setLectureFee(user.lectureFee);
      setCareer(user.career);
      setOption(user.option);
      setIsTeacher(user.teacher);
    }
  }, [user]);

  return (
    <>
      {user ? (
        <>
          <ProfileHeader name={user.name} introduce={user.introduce} user={user} />
          <ProfileTabs
            requests={user.request}
            teacher={user.teacher}
            lectureFee={lectureFee}
            career={career}
            option={option}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Profile;
