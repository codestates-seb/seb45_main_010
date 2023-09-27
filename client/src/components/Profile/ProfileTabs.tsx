import { useEffect, useRef } from 'react';
import RequestList from './ProfileTab/RequestList';
import ScheduleList from './ProfileTab/ScheduleList';
import OptionList from './ProfileTab/OptionList';
import { MatchType } from 'Types/Types';

type ProfileTabsProps = {
  teacher: boolean;
  lectureFee: string;
  career: string;
  option: string;
  onLine: boolean;
  offLine: boolean;
  id: number;
  matches: MatchType[];
  onUpdateOnline: (newState: boolean) => void;
  onUpdateOffline: (newState: boolean) => void;
};

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  teacher,
  lectureFee,
  career,
  option,
  onLine,
  offLine,
  id,
  matches,
  onUpdateOnline,
  onUpdateOffline,
}) => {
  type tabDataType = {
    id: string;
    title: string;
    subtitle: JSX.Element;
  }[];

  const tabData: tabDataType = [
    {
      id: 'request',
      title: '내 강의 조회',
      subtitle: <RequestList teacher={teacher} matches={matches} />,
    },
    ...(teacher
      ? [
          {
            id: 'schedule',
            title: '스케쥴 관리',
            subtitle: <ScheduleList id={id} />,
          },
        ]
      : []),
    {
      id: 'option',
      title: 'Profile 관리',
      subtitle: (
        <OptionList
          teacher={teacher}
          lectureFee={lectureFee}
          career={career}
          option={option}
          onLine={onLine}
          offLine={offLine}
          id={id}
          onUpdateOnline={onUpdateOnline}
          onUpdateOffline={onUpdateOffline}
        />
      ),
    },
  ];

  const tabContainerHeight = 100;
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const onTabClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    event.preventDefault();
    const element = document.getElementById(id) as HTMLElement;
    if (element) {
      const scrollTop = element.offsetTop - tabContainerHeight + 1;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!tabsRef.current) return;

      const offsetForSticky = 480;
      const bottomOfStickyContent = offsetForSticky + tabContainerHeight;

      if (window.scrollY < offsetForSticky) {
        tabsRef.current.classList.remove('fixed');
        tabsRef.current.classList.add('relative', 'top-0');
        tabsRef.current.style.top = '0px';
      } else if (window.scrollY >= offsetForSticky && window.scrollY <= bottomOfStickyContent) {
        tabsRef.current.classList.remove('fixed', 'top-0');
        tabsRef.current.classList.add('relative');
        // tabsRef.current.style.top = `${window.scrollY - offsetForSticky}px`;
      } else {
        tabsRef.current.classList.remove('relative');
        tabsRef.current.classList.add('fixed', 'top-0');
        tabsRef.current.style.top = '0px';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tabContainerHeight]);

  return (
    <>
      <section className="flex flex-col items-center justify-center text-center">
        <div
          ref={tabsRef}
          className="flex w-[375px] h-10 shadow-md z-50 transition-all duration-300 ease-linear"
        >
          {tabData.map((tab) => (
            <a
              key={tab.id}
              className="flex items-center justify-center flex-1 text-sm font-normal tracking-wide text-black transition duration-500 bg-mint-200 hover:bg-white hover:font-semibold"
              href={`#${tab.id}`}
              onClick={(e) => onTabClick(e, `tab-${tab.id}`)}
            >
              {tab.title}
            </a>
          ))}
        </div>
      </section>

      {tabData.map((section) => (
        <section
          key={section.id}
          className="flex flex-col items-center justify-center mt-10"
          id={`tab-${section.id}`}
        >
          <div className="w-full p-4">{section.subtitle}</div>
        </section>
      ))}
    </>
  );
};

export default ProfileTabs;
