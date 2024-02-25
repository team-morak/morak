import { useController, useForm } from 'react-hook-form';

import { RequestGroupsDto } from '@morak/apitype';
import { TextLabel, Button } from '@morak/ui';

import { FormInput } from '@/components';
import { useLeaveGroupQuery } from '@/queries/hooks/group';

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

  const { mutate } = useLeaveGroupQuery();

  return (
    <form
      className={styles.container}
      // TODO: POST 요청
      onSubmit={handleSubmit((data) => {
        mutate(data);
      })}
    >
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
