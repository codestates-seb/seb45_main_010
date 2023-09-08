import { Typography } from '@material-tailwind/react';
import { MEMBER } from 'configs/Footer/configs';
import {
  BiLogoVisualStudio,
  BiLogoTypescript,
  BiLogoTailwindCss,
  BiLogoReact,
  BiLogoGithub,
  BiLogoDiscordAlt,
  BiLogoFigma,
} from 'react-icons/bi';

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full bg-gray-1">
      <div className="grid grid-cols-2 gap-3 py-5">
        {MEMBER.map(({ title, member }, key) => (
          <div key={key} className="flex flex-col items-center">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-bold uppercase opacity-50"
            >
              {title}
            </Typography>
            <ul className="space-y-1 ">
              {member.map((link, key) => (
                <Typography
                  key={key}
                  as="li"
                  color="blue-gray"
                  className="flex justify-center font-normal"
                >
                  <a
                    href={`https://github.com/${link}`}
                    className="inline-block pr-2 text-sm transition-transform hover:scale-105"
                  >
                    {link}
                  </a>
                </Typography>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex gap-4 p-1 text-blue-gray-900 sm:justify-center">
        <Typography
          as="i"
          className="transition-opacity opacity-80 hover:opacity-100"
        >
          <BiLogoTailwindCss />
        </Typography>
        <Typography
          as="i"
          className="transition-opacity opacity-80 hover:opacity-100"
        >
          <BiLogoReact />
        </Typography>
        <Typography
          as="i"
          className="transition-opacity opacity-80 hover:opacity-100"
        >
          <BiLogoDiscordAlt />
        </Typography>
        <Typography
          as="i"
          className="transition-opacity opacity-80 hover:opacity-100"
        >
          <BiLogoTypescript />
        </Typography>
        <Typography
          as="i"
          className="transition-opacity opacity-80 hover:opacity-100"
        >
          <BiLogoVisualStudio />
        </Typography>
        <Typography
          as="i"
          className="transition-opacity opacity-80 hover:opacity-100"
        >
          <BiLogoGithub />
        </Typography>
        <Typography
          as="i"
          className="transition-opacity opacity-80 hover:opacity-100"
        >
          <BiLogoFigma />
        </Typography>
      </div>
    </footer>
  );
};
