// components/Navbar.tsx
import { UserButton, currentUser } from "@clerk/nextjs";
import { StoreSwitcher } from "@/components/ui/store-switcher";
import { findManyStores } from "@/actions/store";
import  Dash2 from "@/components/final-header"
import Navigation from '@/components/Navigation/Navigation';

interface NavbarProps {
  params: {
    storeId: string;
  };
}

const Navbar: React.FC<NavbarProps> = async ({ params }) => {
  const { storeId } = params;

  try {
    // Fetch stores
    const stores = await findManyStores();
    console.log("Fetched Stores:", stores);

    // Use stores in your component
    return (
      <><div className="border-b flex flex-col sm:flex-row items-center">
        {/* Left Menu Block (Hidden on small screens) */}
        <div className="px-4 hidden sm:block sm:w-1/4">
          <StoreSwitcher items={stores} />

        </div>

        {/* Middle Menu Block (Takes full width on small screens) */}
        <div className="w-full sm:w-1/2">
         

<Navigation />
        </div>

        {/* Right Menu Block (Hidden on small screens, takes 1/4 width on larger screens) */}
        <div className="hidden sm:block sm:w-1/4">


          <div className="flex justify-end p-4">
                 <Dash2 />
        </div>
        </div>
      </div></>
    );
  } catch (error) {
    // Handle errors, log them, or rethrow if necessary
    console.error("Error in Navbar component:", error);
    throw error;
  }
};

export default Navbar;