import { useController, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { RequestGroupsDto } from '@morak/apitype';
import { TextLabel, Button } from '@morak/ui';

import { FormInput, Modal } from '@/components';
import { useModal } from '@/hooks';
import { useCreateGroupQuery } from '@/queries/hooks/group';

import { GroupTypeRadio } from './GroupTypeRadio';
import * as styles from './index.css';

export function GroupCreatePage() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<RequestGroupsDto>({
    defaultValues: {
      title: '',
      groupTypeId: 1,
    },
    mode: 'all',
  });

  const {
    field: { value: nameValue, onChange: onChangeName },
  } = useController({
    name: 'title',
    control,
    rules: {
      required: true,
    },
  });

  const { mutateAsync } = useCreateGroupQuery();

  const { openModal } = useModal();
  const navigate = useNavigate();
  const submitGroup = async (data: RequestGroupsDto) => {
    const { status } = await mutateAsync(data);
    // TODO: 에러 처리
    if (status === 201) {
      openModal(
        <Modal
          title="그룹이 생성되었습니다."
          buttonType="single"
          onClickConfirm={() => navigate('/groups')}
        />,
      );
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(submitGroup)}>
      <FormInput
        label="그룹명"
        required
        value={nameValue}
        onChange={onChangeName}
      />
      <div className={styles.inputWrapper}>
        <TextLabel label="그룹 유형" required />
        <GroupTypeRadio control={control} />
      </div>
      <Button
        type="submit"
        theme="primary"
        shape="fill"
        size="large"
        fullWidth
        disabled={!isValid}
      >
        확인
      </Button>
    </form>
  );
}
