
import ProfileTabs from 'components/Profile/ProfileTabs';
import ProfileHeader from 'components/Profile/ProfileHeader';

export default function StudentProfile() {
  const name: string = '정현진';
  const introduce: string = `{저는 서울대학교를 목표로 하고 있는 고등학교 3학년입니다.
    꿈은 이루어진다~~~~}`;
  return (
    <>
      <ProfileHeader name={name} introduce={introduce} />
      <ProfileTabs />
    </>
  );
}
