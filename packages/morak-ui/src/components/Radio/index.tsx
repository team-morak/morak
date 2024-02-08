import * as styles from './index.css';

type RadioProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  id: string;
};

export function Radio({ id, checked, onChange, children }: RadioProps) {
  return (
    <label className={styles.container} htmlFor={id}>
      <input
        type="radio"
        name="group"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <span>{children}</span>
    </label>
  );
}
