import "./styles.css";

const Button = ({
  label,
  onClick,
  icon,
  bannerBtn,
  placeBid1,
  placeBid2,
  itemDetails,
  navBar,
  className,
  children,
}: any) => {
  return (
    <div onClick={onClick} className={`custom-button ${className}`}>
      {bannerBtn || navBar || placeBid1 || placeBid2 || itemDetails
        ? icon
        : undefined}
      {children}
      {label}
    </div>
  );
};

export default Button;
