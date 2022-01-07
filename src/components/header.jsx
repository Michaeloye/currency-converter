import React from "react";
import { SiExpertsexchange } from "react-icons/si";

function Header() {
  return (
    <div className="bg-primary-red h-10 flex items-center">
      <div className="ml-5">
        {/* <h1 className="text-white text-2xl font-bold">XC</h1> */}
        <SiExpertsexchange color="white" size="27" />
      </div>
    </div>
  );
}

export default Header;
