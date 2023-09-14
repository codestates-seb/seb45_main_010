import React, { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody, Button } from '@material-tailwind/react';
import { BsChevronDown } from 'react-icons/bs';
import { DetailType } from 'Types/Types';

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
      <h2 className="my-5 text-sm font-bold">수업 가능 시간</h2>
      <section className="flex flex-col items-center justify-center gap-5">
        <p className="m-5 text-sm mt-[40px]">수업 가능 시간</p>
        <div className="flex flex-col items-center justify-center gap-5">
          <Button
            className="flex items-center justify-between p-2 text-sm font-bold text-black bg-mint-4 rounded-xl w-[230px] border-mint-2"
            size="sm"
          >
            <span className="flex-1 text-center">날짜 선택</span>
            <BsChevronDown className="ml-auto" />
          </Button>
          <div className="h-[150px] w-[230px] bg-mint-4">달력 자리</div>
          <div>
            <Button
              className="mb-5 flex items-center justify-between p-2 text-sm font-bold text-black bg-mint-2 rounded-xl w-[230px] border-mint-2"
              size="sm"
            >
              <span className="flex-1 text-center">17:00 ~ 18:00</span>
            </Button>
            <Button
              className="flex items-center justify-between p-2 text-sm font-bold text-black bg-mint-2 rounded-xl w-[230px] border-mint-2"
              size="sm"
            >
              <span className="flex-1 text-center">18:00 ~ 19:00</span>
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
};

export default TeacherInfo2;
