import { useState } from 'react';
import { Menu, MenuHandler, MenuList, MenuItem, Button } from '@material-tailwind/react';
import { BsX, BsChevronDown } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useEffect } from 'react';
import { updateSubjects, updateRegions } from 'redux/thunk/ProfilePageThunk';

const ProfileDropdown = ({
  title,
  selections,
  categories,
  id,
}: {
  title: string;
  selections: string[];
  categories: string[];
  id: number;
}) => {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [tags, setTags] = useState<string[]>(categories || []);
  const profile = useAppSelector((state) => state.profile.value);

  useEffect(() => {
    if (title === '과목') {
      dispatch(updateSubjects({ id: id, subjects: tags }));
    } else if (title === '지역') {
      dispatch(updateRegions({ id: id, regions: tags }));
    }
  }, [tags, title]);

  const handleCategorySelect = (item: string) => {
    setSelectedCategory(item);
    addTag(item);
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 mt-5">
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button
              className="flex items-center gap-2 p-2 text-sm font-bold text-black bg-white rounded-xl h-9 basis-1/5 border-mint-200"
              variant="outlined"
              size="sm"
            >
              {title}
              <BsChevronDown />
            </Button>
          </MenuHandler>
          <MenuList className=" border-mint-200 max-h-72">
            {selections.map((item) => (
              <MenuItem key={item} onClick={() => handleCategorySelect(item)}>
                {item}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <div className="right-0 flex flex-wrap gap-4 basis-3/5">
          {tags.map((tag) => (
            <Button key={tag} className="flex h-8 gap-1 p-2 text-black bg-mint-200 rounded-xl">
              {tag}
              <BsX className="text-blue-2" onClick={() => removeTag(tag)} />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
