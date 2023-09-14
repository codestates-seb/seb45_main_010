import React, { useEffect } from 'react';
import Thumbnail from '/assets/Image/mone.png';
import { AiFillCamera } from 'react-icons/ai';
import { fetchUserDetails } from 'redux/slice/MemberSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { ChangeModal } from 'components/Modal/ChangeModal';
import { checkAuth } from 'components/Auth/CheckAuth';

const Private: React.FC = () => {
  const authData = checkAuth();
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.member.user);
  console.log(userDetails);

  useEffect(() => {
    // 페이지가 로딩될 때 사용자 정보를 가져옵니다.
    dispatch(fetchUserDetails(authData));
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
          <div className="flex flex-col justify-end item-center">
            <div className="flex items-center justify-center bg-gray-100 rounded-full h-7 w-7 opacity-80">
              <AiFillCamera className="w-5 h-5" />
            </div>
          </div>
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
              title=""
              text="변경할 이름을 입력하세요"
              warning=""
              btnName="변경"
              btnCheck="제출"
              changeItem="name"
              userId={userDetails.id}
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
              title=""
              text="변경할 비밀번호를 입력하세요"
              warning="숫자+영문조합으로 8자이상 입력해주세요"
              btnName="변경"
              btnCheck="제출"
              changeItem="password"
              userId={userDetails.id}
            />
          </div>
        </div>
      </div>

      <div className="flex-col my-5">
        <div className="text-sm">전화번호</div>
        <div className="flex items-center">
          <div className="flex items-center border text-xs h-[50px] border-blue-800/60 rounded-lg w-80 p-2">
            {userDetails.phoneNumber === (null || undefined)
              ? 'your phone number here'
              : userDetails.phoneNumber}
          </div>
          <div className="m-2">
            <ChangeModal
              title=""
              text="새로운 전화번호를 입력하세요"
              warning="숫자로만 입력해주세요"
              btnName="변경"
              btnCheck="제출"
              changeItem="phone"
              userId={userDetails.id}
            />
          </div>
        </div>
        <div className="p-1 text-sm text-gray-700">전화번호는 숫자로만 입력해주세요</div>
      </div>
    </div>
  );
};

export default Private;
