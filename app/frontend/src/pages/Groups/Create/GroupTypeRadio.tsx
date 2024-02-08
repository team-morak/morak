import { Control, useController } from 'react-hook-form';

import { Radio } from '@morak/ui';

import * as styles from './index.css';
import { GroupCreate } from './types';

export function GroupTypeRadio({ control }: { control: Control<GroupCreate> }) {
  const {
    field: { value, onChange },
  } = useController({
    name: 'type',
    control,
  });

  return (
    <div className={styles.groupWrapper}>
      {['public', 'private'].map((type) => (
        <Radio
          key={type}
          id={type}
          checked={value === type}
          onChange={(e) => onChange(e.target.id)}
        >
          {type === 'public' ? '공개' : '비공개'} 그룹
        </Radio>
      ))}
    </div>
  );
}
