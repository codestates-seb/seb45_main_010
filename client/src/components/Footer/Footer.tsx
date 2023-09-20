import { Typography } from '@material-tailwind/react';
import FooterGithub from './FooterGithub';
import FooterIcon from './FooterIcon';
import { footerInfo } from 'configs/Footer/configs';

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full bg-blue-gray-50">
      <div className="p-2">
        <FooterGithub />
        <div className="flex justify-end gap-2 text-black">
          <FooterIcon />
        </div>
        <Typography
          color="blue-gray"
          className="mt-2 text-xs text-center text-gray-600 border-t-2 border-gray-300"
        >
          &copy; {footerInfo.footerMessage}
        </Typography>
      </div>
    </footer>
  );
};
