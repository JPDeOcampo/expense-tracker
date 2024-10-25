"use client";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import Hamburger from "@/components/shared/components/hamburger";
import Profile from "@/components/shared/components/profile";
import MenuHeader from "@/components/shared/components/menu-header";
import useGlobalHooks from "@/components/shared/hooks/global-hooks";

const Header = () => {
  const { shareContext } = useShareContextHooks();
  const { isMenuDrawer } = shareContext;
  const { handleMenuClick } = useGlobalHooks();

  return (
    <>
      <header className="w-full flex justify-between lg:justify-end px-6 lg:pr-14 py-5 lg:py-6 bg-secondary-50">
        <div className="lg:hidden flex items-center gap-3">
          <Hamburger
            isMenuDrawer={isMenuDrawer}
            handleClick={handleMenuClick}
          />
          <div className={`${isMenuDrawer ? "hidden" : "block"}`}>
            <MenuHeader />
          </div>
        </div>

        <Profile />
      </header>
    </>
  );
};

export default Header;
