import { HTMLAttributes, SVGAttributes } from 'react';
import { CgSpinner, CgSpinnerTwoAlt } from 'react-icons/cg';

interface Props {
  size: 'small' | 'medium' | 'large';
  variant: 'basic' | 'alt';
  wrappedClassName?: HTMLAttributes<HTMLDivElement>['className'];
  iconClassName?: SVGAttributes<SVGElement>['className'];
  color?: string;
}

const Spinner: React.FC<Props> = ({ size, variant = 'basic', wrappedClassName, iconClassName, color }) => {
  return (
    <div className={wrappedClassName}>
      {variant === 'basic' ? (
        <CgSpinner
          className={`${
            size === 'small' ? 'text-2xl' : size === 'medium' ? 'text-4xl' : 'text-6xl'
          } text-white animate-spin ${iconClassName}`}
          color={color || 'white'}
        />
      ) : (
        <CgSpinnerTwoAlt
          className={`${
            size === 'small' ? 'text-2xl' : size === 'medium' ? 'text-4xl' : 'text-6xl'
          } text-white animate-spin ${iconClassName}`}
          color={color || 'white'}
        />
      )}
    </div>
  );
};

export default Spinner;
