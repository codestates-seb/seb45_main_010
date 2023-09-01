import ProfileBody from 'components/Profile/ProfileBody';
import ProfileHeader from 'components/Profile/ProfileHeader';

export default function Profile() {
  const name: string = '홍길동';
  return (
    <>
      <ProfileHeader name={name} />
      <ProfileBody />
    </>
  );
}
