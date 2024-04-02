import classNames from 'classnames';

import styles from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  animation?: 'wave' | 'pulse';
}

export function Skeleton({ className, animation = 'wave' }: SkeletonProps) {
  return (
    <span
      className={classNames(styles.skeleton, className, {
        [styles.wave]: animation === 'wave',
      })}
    />
  );
}
