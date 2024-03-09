import { useMutation } from '@tanstack/react-query';

import { Modal } from '@/components';
import { useModal } from '@/hooks';
import { group } from '@/services';

export const useGroupApply = () => {
  const { mutate } = useMutation({
    mutationFn: (id: string) => group.apply({ id }),
  });
  const { openModal } = useModal();

  const handleApply = async (id: string) => {
    mutate(id, {
      onSuccess: () =>
        openModal(
          <Modal title="가입 신청이 완료되었습니다." buttonType="single" />,
        ),
      onError: () =>
        openModal(
          <Modal title="가입 신청에 실패했습니다." buttonType="single" />,
        ),
    });
  };

  return { handleApply };
};
