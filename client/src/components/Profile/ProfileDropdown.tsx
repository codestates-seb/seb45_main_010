import { useState } from 'react';
import { Menu, MenuHandler, MenuList, MenuItem, Button } from '@material-tailwind/react';
import { BsX, BsChevronDown } from 'react-icons/bs';

export default function ProfileDropdown() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const category = ['수학', '과학', '외국어', '국사', '사회'];

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
      <div className="flex flex-wrap gap-4 mt-4">
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button
              className="flex items-center gap-2 p-2 text-sm font-bold text-black bg-white rounded-xl h-9 basis-1/5 border-mint-2"
              variant="outlined"
              size="sm"
            >
              과목
              <BsChevronDown />
            </Button>
          </MenuHandler>
          <MenuList className=" border-mint-2">
            {category.map((item) => (
              <MenuItem key={item} onClick={() => handleCategorySelect(item)}>
                {item}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <div className="right-0 flex flex-wrap gap-4 basis-3/5">
          {tags.map((tag) => (
            <Button key={tag} className="flex h-8 gap-1 p-2 text-black bg-mint-2 rounded-xl">
              {tag}
              <BsX className="text-blue-2" onClick={() => removeTag(tag)} />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
