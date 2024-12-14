import logo from "../assets/Logo-2.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosMenu } from "react-icons/io";

function Navbar() {
  return (
    <>
      <div className="flex flex-wrap justify-evenly h-24 p-5 shadow-xl items-center">
        <div className="justify-evenly items-center">
          <a href="/">
            <img src={logo} width={150} height={80} alt="Logo" />
          </a>
        </div>

        <div className="flex md:hidden"> 
          <DropdownMenu>
            <DropdownMenuTrigger className="font-medium"><IoIosMenu /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a href="/">SEARCH</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="https://girmantech.com" target="_blank" rel="noopener noreferrer">
                  WEBSITE
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="https://www.linkedin.com/company/girmantech/" target="_blank" rel="noopener noreferrer">
                  LINKEDIN
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="mailto:contact@girmantech.com">CONTACT</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Regular menu items for large screens */}
        <div className="hidden md:flex flex-wrap gap-16 justify-center items-center"> {/* This hides on mobile */}
          <a href="/">SEARCH</a>
          <a href="https://girmantech.com" target="_blank" rel="noopener noreferrer">
            WEBSITE
          </a>
          <a href="https://www.linkedin.com/company/girmantech/" target="_blank" rel="noopener noreferrer">
            LINKEDIN
          </a>
          <a href="mailto:contact@girmantech.com">CONTACT</a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
