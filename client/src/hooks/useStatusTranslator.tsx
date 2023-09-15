import { useCallback } from 'react';
import { StatusType } from 'Types/Types';
function useStatusTranslator() {
  const translateStatus = useCallback((status: StatusType) => {
    const statusMapping: { [key in StatusType]: { className: string; text: string } } = {
      MATCH_ANSWERED: {
        className: 'bg-mint-200 border-[#BEDEF1] hover:bg-gray-1 hover:border-gray-1',
        text: '답변완료',
      },
      MATCH_CANCELLED: {
        className: 'bg-mint-200 border-[#BEDEF1] hover:bg-gray-1 hover:border-gray-1',
        text: '취소완료',
      },
      MATCH_REQUEST: {
        className: 'bg-[#BEDEF1] border-blue-3 hover:bg-blue-1 hover:border-blue-1',
        text: '수업요청',
      },
    };

    return statusMapping[status] || { className: '', text: status };
  }, []);

  return translateStatus;
}

export default useStatusTranslator;
