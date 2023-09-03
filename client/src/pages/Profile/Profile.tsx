
import ProfileTabs from 'components/Profile/ProfileTabs';
import ProfileHeader from 'components/Profile/ProfileHeader';

export default function Profile() {
  const name: string = '홍길동';
  const introduce: string = `저는 서울대학교 수학과를 졸업했으며, 10년 이상 입시 학원 및 개인 지도를 해온 경력을 가지고
  있습니다. 초등 및 중학수학을 비롯한 수학의 기초다지기, 고등수학 및 심화학습, 내신 대비,
  수능시험을 준비를 위한 타켓 수업등을 폭넓게 진행하고 있습니다.`;
  return (
    <>
      <ProfileHeader name={name} introduce={introduce} />
      <ProfileTabs />
    </>
  );
}
