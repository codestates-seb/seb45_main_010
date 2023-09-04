import { useEffect, useState, useRef } from 'react';
import RequestList from './ProfileTab/RequestList';
import ScheduleList from './ProfileTab/ScheduleList';
import OptionList from './ProfileTab/OptionList';
import { UserRequest } from 'components/Type/User';

type ProfileTabsProps = {
  requests: UserRequest[];
  job: string;
  lectureFee: string;
  career: string;
  option: string;
};

const ProfileTabs: React.FC<ProfileTabsProps> = ({ requests, job, lectureFee, career, option }) => {
  type tabData = {
    id: string;
    title: string;
    subtitle: JSX.Element;
  }[];

  const tabData = [
    {
      id: 'request',
      title: '내 강의 조회',
      subtitle: <RequestList requests={requests} job={job} />,
    },
    ...(job === 'teachers'
      ? [{ id: 'schedule', title: '스케쥴 관리', subtitle: <ScheduleList /> }]
      : []),
    {
      id: 'option',
      title: 'Profile 관리',
      subtitle: <OptionList job={job} lectureFee={lectureFee} career={career} option={option} />,
    },
  ];
  const [currentId, setCurrentId] = useState<string | null>(null);
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
        tabsRef.current.style.position = 'relative';
        tabsRef.current.style.top = '0px';
      } else if (window.scrollY >= offsetForSticky && window.scrollY <= bottomOfStickyContent) {
        tabsRef.current.style.position = 'relative';
        tabsRef.current.style.top = `${window.scrollY - offsetForSticky}px`;
      } else {
        tabsRef.current.style.position = 'fixed';
        tabsRef.current.style.top = '48px';
      }

      const sections = document.querySelectorAll<HTMLElement>('.et-slide');
      let newCurrentId: string | null = null;
      sections.forEach((section) => {
        if (
          window.scrollY > section.offsetTop - tabContainerHeight &&
          window.scrollY < section.offsetTop + section.offsetHeight
        ) {
          newCurrentId = section.id;
        }
      });
      if (newCurrentId !== currentId) {
        setCurrentId(newCurrentId);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentId, tabContainerHeight]);

  return (
    <>
      <section className="flex flex-col items-center justify-center text-center">
        <div ref={tabsRef} className="flex w-[350px] h-10 shadow-md">
          {tabData.map((tab) => (
            <a
              key={tab.id}
              className="flex items-center justify-center flex-1 text-sm font-normal tracking-wide text-black transition duration-500 bg-mint-2 hover:bg-white hover:font-semibold"
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
          <div className="w-[350px]">{section.subtitle}</div>
        </section>
      ))}
    </>
  );
};

export default ProfileTabs;
