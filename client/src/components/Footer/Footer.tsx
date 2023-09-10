import { Typography } from '@material-tailwind/react';
import FooterGithub from './FooterGithub';
import FooterIcon from './FooterIcon';
import { footerInfo } from 'configs/Footer/configs';

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full bg-blue-gray-50">
      <div className="flex gap-4 p-1 text-black">
        <FooterIcon />
      </div>
      <div className="p-2">
        <FooterGithub />
        <Typography color="blue-gray" className="mt-2 text-xs text-gray-600">
          &copy; {footerInfo.footerMessage}
        </Typography>
      </div>
    </footer>
  );
};
