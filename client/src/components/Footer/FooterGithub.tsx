import React from 'react';
import { footerInfo } from 'configs/Footer/configs';
import { FooterMember } from './FooterMember';

const FooterGithub = () => {
  return (
    <>
      <ul className="grid items-center w-40 grid-cols-2 text-center">
        {footerInfo.member.map((member, index) => {
          return (
            <li key={index}>
              <FooterMember member={member} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default FooterGithub;
