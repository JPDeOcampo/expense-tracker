interface IPropTypes {
  isMenuDrawer?: boolean;
  handleClick?: () => void;
}
const Hamburger = ({ isMenuDrawer, handleClick }: IPropTypes) => {

  const menuClass = `w-6 h-[3px] rounded bg-primary duration-400`;

  return (
    <div className={`flex md:py-6 `}>
      <div className="flex justify-center items-center w-6 h-6">
        <div className="inline-block cursor-pointer" onClick={handleClick}>
          <div
            className={`transition-transform ${menuClass} ${
              isMenuDrawer ? "translate-y-[8px] rotate-[-45deg]" : ""
            }`}
          ></div>
          <div
            className={`transition-opacity my-[4px] ${menuClass} ${
              isMenuDrawer ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`transition-transform ${menuClass} ${
              isMenuDrawer ? "translate-y-[-6px] rotate-[45deg]" : ""
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
