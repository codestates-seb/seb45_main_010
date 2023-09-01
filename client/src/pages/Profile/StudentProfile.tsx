import ProfileBody from 'components/Profile/ProfileBody';
import ProfileHeader from 'components/Profile/ProfileHeader';

export default function StudentProfile() {
  const name: string = '정현진';
  return (
    <>
      <ProfileHeader name={name} />
      <ProfileBody />
    </>
  );
}
