import React, { useState } from 'react';
import { Typography } from '@material-tailwind/react';
import { footerInfo } from 'configs/Footer/configs';

const FooterGithub = () => {
  const [isMember, setIsMember] = useState<boolean>(false);

  const handlerMember = (): void => {
    setIsMember(!isMember);
  };

  return (
    <>
      <Typography
        as="a"
        href={`https://github.com/${footerInfo.teamGithub}`}
        color="blue-gray"
        className="mb-1 text-xs transition-colors hover:text-blue-500 focus:text-blue-500"
      >
        Project X10
      </Typography>
      <Typography
        as="button"
        onClick={handlerMember}
        color="blue-gray"
        className="mb-1 text-xs transition-colors hover:text-blue-500 focus:text-blue-500"
      >
        Member
      </Typography>
      {isMember && (
        <ul className="grid grid-cols-3 gap-2">
          {footerInfo.member.map((github, index) => {
            return (
              <li key={index}>
                <Typography
                  as="a"
                  href={`https://github.com/${github}`}
                  color="blue-gray"
                  className="text-center transition-colors text-xxs hover:text-blue-500 focus:text-blue-500"
                >
                  {github}
                </Typography>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default FooterGithub;
