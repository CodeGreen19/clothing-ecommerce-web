import { cn } from "@/lib/utils";

import LoginModal from "@/features/auth/components/LoginModal";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import Logo from "../../../../components/logo";
import { NavigationMenuComp } from "./NavigationMenu";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";
import SearchDrawer from "./SearchDrawer";
import CartsAndPaymentSheet from "../../cart&payments/components";
import WishListsSheet from "../../wishlists/components";
import MobileNavigationMenu from "./MobileNavigationMenu";
import { getUserCartCount } from "../../cart&payments/server/cart.action";
import UserInfo from "./UserInfo";

const Navbar = async () => {
  const session = await auth();
  const cartCount = await getUserCartCount();

  return (
    <div
      className={cn(
        "sticky left-0 top-0 flex h-20 w-full items-center justify-center bg-transparent",
        "wave-border-bottom bg-black",
      )}
    >
      <div className="container m-auto flex items-center justify-between px-3 md:px-0">
        <Logo />

        <NavigationMenuComp />
        <ul className="flex items-center justify-center gap-1 text-white md:gap-2">
          <SearchDrawer>
            <li className="nav-icon">
              <Search />
            </li>
          </SearchDrawer>
          {session?.user ? (
            <UserMenu>
              <li className="nav-icon">
                <User />
              </li>
            </UserMenu>
          ) : (
            <LoginModal>
              <li className="nav-icon">
                <User />
              </li>
            </LoginModal>
          )}

          <CartsAndPaymentSheet>
            <li className="nav-icon relative">
              <span className="absolute -right-1 -top-3 block p-1">
                {cartCount}
              </span>
              <ShoppingCart />
            </li>
          </CartsAndPaymentSheet>
          <WishListsSheet>
            <li className="nav-icon">
              <Heart />
            </li>
          </WishListsSheet>

          <MobileNavigationMenu>
            <li className="nav-icon block bg-white lg:hidden">
              <div className="*:drop-sm grid grid-cols-2 gap-1 *:size-[6px] *:rounded-full">
                <span className="inline-block bg-rose-800"></span>
                <span className="inline-block bg-yellow-600"></span>
                <span className="inline-block bg-purple-600"></span>
                <span className="inline-block bg-green-600"></span>
              </div>
            </li>
          </MobileNavigationMenu>
        </ul>
      </div>

      <UserInfo />
    </div>
  );
};

export default Navbar;
