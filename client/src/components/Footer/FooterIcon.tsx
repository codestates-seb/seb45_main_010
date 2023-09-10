import { Typography } from '@material-tailwind/react';
import { BiLogoVisualStudio, BiLogoGithub, BiLogoDiscordAlt, BiLogoFigma } from 'react-icons/bi';
import React from 'react';

const FooterIcon = () => {
  return (
    <>
      <Typography as="i" className="transition-opacity opacity-50 hover:opacity-100">
        <BiLogoGithub />
      </Typography>
      <Typography as="i" className="transition-opacity opacity-50 hover:opacity-100">
        <BiLogoDiscordAlt />
      </Typography>
      <Typography as="i" className="transition-opacity opacity-50 hover:opacity-100">
        <BiLogoVisualStudio />
      </Typography>
      <Typography as="i" className="transition-opacity opacity-50 hover:opacity-100">
        <BiLogoFigma />
      </Typography>
    </>
  );
};

export default FooterIcon;
