import React, { useEffect } from 'react';
import Thumbnail from '/assets/Image/mone.png';
import { AiFillCamera } from 'react-icons/ai';
import { fetchUserDetails } from 'redux/slice/MemberSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { ChangeModal } from 'components/Modal/ChangeModal';
import { ImageChangeModal } from 'components/Modal/ImageChangeModal';
import { Logout } from 'components/Auth/Logout';

const Private: React.FC = () => {
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.member.user);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center px-[12.5px]">
      <div className="flex mb-2">
        <div className="flex">
          <div className="flex flex-row justify-center item-center mr-[-30px]">
            {userDetails.profileImg ? (
              <img src={userDetails.profileImg} className="m-2 mx-6 rounded-lg h-14 w-14" />
            ) : (
              <img src={Thumbnail} className="m-2 mx-6 rounded-lg h-14 w-14" />
            )}
          </div>
          {userDetails.teacher === true ? (
            <div className="flex flex-col justify-end item-center">
              <div className="flex items-center justify-center bg-gray-100 rounded-full h-7 w-7 opacity-80">
                <AiFillCamera className="w-5 h-5" />
              </div>
              <ImageChangeModal
                text="변경할 이미지의 URL을 입력하세요"
                warning="이미지 URL로만 업데이트됩니다"
                changeItem="profileImg"
                userId={userDetails.id}
                teacher={userDetails.teacher}
              />
            </div>
          ) : (
            <div className="m-1"></div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <div className="m-1 text-2xl">{userDetails.name}</div>
        </div>
      </div>
      <div className="flex-col mb-1 px-7">
        <div className="text-sm">이메일</div>
        <div className="text-sm">{userDetails.email}</div>
      </div>

      <div className="flex-col my-5">
        <div className="text-sm">이름</div>
        <div className="flex items-center">
          <div className="flex items-center border text-xs h-[50px] border-blue-800/60 rounded-lg w-80 p-2">
            {userDetails.name}
          </div>
          <div className="m-2">
            <ChangeModal
              text="변경할 이름을 입력하세요"
              warning=""
              changeItem="name"
              userId={userDetails.id}
              teacher={userDetails.teacher}
              placeholder={userDetails.name}
              oauthUser={userDetails.oauth}
            />
          </div>
        </div>
      </div>

      <div className="flex-col my-5">
        <div className="text-sm">비밀번호</div>
        <div className="flex items-center">
          <div className="flex items-center border text-xs h-[50px] border-blue-800/60 rounded-lg w-80 p-2">
            *********
          </div>
          <div className="m-2">
            <ChangeModal
              text="변경할 비밀번호를 입력하세요"
              warning="숫자+영문조합으로 8자이상 입력해주세요"
              changeItem="password"
              userId={userDetails.id}
              teacher={userDetails.teacher}
              placeholder=""
            />
          </div>
        </div>
      </div>

      <div className="flex-col my-5">
        <div className="text-sm">전화번호</div>
        <div className="flex items-center">
          <div className="flex items-center border text-xs h-[50px] border-blue-800/60 rounded-lg w-80 p-2">
            {userDetails.phone === (null || undefined)
              ? 'your phone number here'
              : userDetails.phone}
          </div>
          <div className="m-2">
            <ChangeModal
              text="새로운 전화번호를 입력하세요"
              warning="숫자로만 입력해주세요"
              changeItem="phone"
              userId={userDetails.id}
              teacher={userDetails.teacher}
              placeholder={userDetails.phone}
            />
          </div>
        </div>
        <div className="p-1 text-sm text-gray-700">전화번호는 숫자로만 입력해주세요</div>
      </div>
      <Logout></Logout>
    </div>
  );
};

export default Private;
