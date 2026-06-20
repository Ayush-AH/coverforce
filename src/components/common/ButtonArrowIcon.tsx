type ButtonArrowIconProps = {
  className?: string;
};

const ButtonArrowIcon = ({ className = "" }: ButtonArrowIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 8 5"
      fill="none"
      className={`arrow-icon shrink-0 ${className}`}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.32517 0.0354578L5.42397 1.6028e-07L8 2.51064L5.4458 5L4.3052 4.96635L5.57012 3.73355C5.878 3.43348 6.15998 3.16461 6.41658 2.92694L0.205982 2.9077L0.244359 2.0731L6.45486 2.09244C6.20397 1.86046 5.92658 1.59621 5.62262 1.29997L4.32517 0.0354578Z"
        fill="currentColor"
      />
      <path
        d="M0.82393 2.00287e-07L0.82393 2.90815H0L2.64111e-07 1.65186e-07L0.82393 2.00287e-07Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ButtonArrowIcon;
