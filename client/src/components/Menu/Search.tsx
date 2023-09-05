import { Card } from '@material-tailwind/react';
import { Input, Select, Option } from '@material-tailwind/react';
import { AiOutlineSearch } from 'react-icons/ai';

type props = {
  handlerSearch: () => void;
};

export const Search = ({ handlerSearch }: props) => {
  return (
    <>
      <div
        className="absolute top-0 w-full h-full bg-black bg-opacity-10 "
        onClick={handlerSearch}
      ></div>
      <Card className="w-[350px] p-2 shadow-xl top-3 absolute m-3">
        <form>
          <div className="relative flex w-full gap-2 w-100%">
            <Input type="search" label="Search..." crossOrigin={undefined} />
            <AiOutlineSearch
              className="  absolute right-0 text-xl cursor-pointer text-gray-3 m-2"
              onClick={handlerSearch}
            />
          </div>
          <div className="m-3">
            <div className="mb-5">
              <Select label="과목별">
                <Option>국어</Option>
                <Option>영어</Option>
                <Option>수학</Option>
                <Option>생활과윤리</Option>
                <Option>지리</Option>
                <Option>한국사</Option>
                <Option>세계사</Option>
                <Option>물리</Option>
                <Option>화학</Option>
                <Option>생명과학</Option>
                <Option>제2외국어</Option>
              </Select>
            </div>
            <div className="mb-5">
              <Select label="지역별">
                <Option>서울</Option>
                <Option>경기</Option>
                <Option>강원</Option>
                <Option>제주</Option>
                <Option>경북</Option>
                <Option>경남</Option>
                <Option>충북</Option>
                <Option>충남</Option>
                <Option>전북</Option>
                <Option>전남</Option>
              </Select>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
};
