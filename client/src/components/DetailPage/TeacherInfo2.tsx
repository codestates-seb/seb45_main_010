import React, { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { DetailType } from 'Types/Types';
import DetailScheduleList from './DetailScheduleList';

type props = {
  teacherInfo: DetailType;
};

const TeacherInfo2 = ({ teacherInfo }: props) => {
  const [openIntroduce, setOpenIntroduce] = useState(true);
  const [openOption, setOpenOption] = useState(true);
  const [openCareer, setOpenCareer] = useState(true);
  const handleOpenIntroduce = () => setOpenIntroduce((cur) => !cur);
  const handleOpenOption = () => setOpenOption((cur) => !cur);
  const handleOpenCareer = () => setOpenCareer((cur) => !cur);

  return (
    <article className="px-[7.5px]">
      <Accordion open={openIntroduce}>
        <AccordionHeader onClick={handleOpenIntroduce} className="my-5 text-sm font-semibold">
          자기소개
        </AccordionHeader>
        <AccordionBody
          className="text-xs font-normal leading-5 text-black"
          children={teacherInfo.introduction || ''}
        />
      </Accordion>
      <Accordion open={openOption}>
        <AccordionHeader onClick={handleOpenOption} className="my-5 text-sm font-semibold">
          수업설명
        </AccordionHeader>
        <AccordionBody
          className="text-xs font-normal leading-5 text-black"
          children={teacherInfo.option || ''}
        />
      </Accordion>
      <Accordion open={openCareer}>
        <AccordionHeader onClick={handleOpenCareer} className="my-5 text-sm font-semibold">
          학력 및 경력
        </AccordionHeader>
        <AccordionBody
          className="text-xs font-normal leading-5 text-black"
          children={teacherInfo.career || ''}
        />
      </Accordion>
      <DetailScheduleList id={teacherInfo.id} />
    </article>
  );
};

export default TeacherInfo2;
