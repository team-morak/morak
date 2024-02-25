import { Control, useController } from 'react-hook-form';

import { RequestGroupsDto } from '@morak/apitype';
import { Radio } from '@morak/ui';

import * as styles from './index.css';

export function GroupTypeRadio({
  control,
}: {
  control: Control<RequestGroupsDto>;
}) {
  const {
    field: { value, onChange },
  } = useController({
    name: 'groupTypeId',
    control,
  });

  return (
    <div className={styles.groupWrapper}>
      {[1, 0].map((type) => (
        <Radio
          key={type}
          id={`${type}`}
          checked={value === type}
          onChange={(e) => onChange(e.target.id)}
        >
          {type ? '공개' : '비공개'} 그룹
        </Radio>
      ))}
    </div>
  );
}
