import React from 'react';
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Avatar,
  Typography,
} from '@material-tailwind/react';

type props = {
  member: {
    name: string;
    position: string;
    profileImg: string;
  };
};

export const FooterMember = ({ member }: props) => {
  const [openPopover, setOpenPopover] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <a
          href={`https://github.com/${member.name}`}
          className="p-2 rounded-full text-xxs hover:bg-blue-gray-100"
        >
          {member.name}
        </a>
      </PopoverHandler>
      <PopoverContent {...triggers} className="z-50 max-w-[6rem]">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Avatar size="md" variant="circular" src={member.profileImg} alt={member.name} />
        </div>
        <Typography
          variant="h6"
          color="blue-gray"
          className="flex items-center gap-2 mb-2 font-medium text-xxs"
        >
          <p>{member.name}</p>
        </Typography>
        <div className="flex items-center justify-center border-t border-blue-gray-50">
          <p>{member.position}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};
