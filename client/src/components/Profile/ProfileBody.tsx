// import { PiNoteLight, PiUserLight } from 'react-icons/pi';
// import { CiCalendarDate } from 'react-icons/ci';

import OptionList from './ProfileTab/OptionList';
import ScheduleList from './ProfileTab/ScheduleList';
import RequestList from './ProfileTab/RequestList';
import { Tabs, Tab, TabsHeader, TabsBody, TabPanel } from '@material-tailwind/react';

export default function ProfileBody() {
  const data = [
    { id: 0, name: '내 강의 조회', desc: <RequestList /> },
    { id: 1, name: '스케쥴 관리', desc: <ScheduleList /> },
    { id: 2, name: 'Profile 관리', desc: <OptionList /> },
  ];
  return (
    <Tabs value="내 강의 조회">
      <TabsHeader className="mx-5 mb-4 bg-mint-2">
        {data.map((value) => (
          <Tab className="font-semibold" key={value.id} value={value.name}>
            {value.name}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="text-inherit">
        {data.map((value) => (
          <div key={value.id}>
            <TabPanel className="font-normal text-black" value={value.name}>
              {value.desc}
            </TabPanel>
          </div>
        ))}
      </TabsBody>
    </Tabs>
  );
}
