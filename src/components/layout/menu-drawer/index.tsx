import { MdOutlineDashboard, MdOutlineCategory } from "react-icons/md";
const MenuItem = ({ icon, name, route }: any) => {
  return (
    <a className={`flex gap-2 items-center py-2 px-4 font-semibold cursor-pointer ${route === '/' ? 'border-l-5 border-tertiary-500 bg-primary-500 text-neutral-light' : 'hover:text-primary'}`}>
      <span className="text-xl">{icon}</span>
      <span className="text-base">{name}</span>
    </a>
  );
};
const MenuDrawer = () => {
  return (
    <div className="w-full h-full bg-neutral-light flex flex-col gap-4">
      <div className="py-6 px-4">
        <h1>XTracker</h1>
      </div>
      <div className="flex flex-col">
        <MenuItem icon={<MdOutlineDashboard />} name="Dashboard" route="/" />
        <MenuItem icon={<MdOutlineCategory />} name="Categories" route="cat" />
        <MenuItem icon="" name="Export" route="ex" />
      </div>
    </div>
  );
};

export default MenuDrawer;
