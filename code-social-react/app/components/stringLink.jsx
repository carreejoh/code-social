"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

function StringLink({ stringLink }) {
  return (
    <div className="col-span-1 p-2 border-[1px] border-lightestGray overflow-hidden rounded-lg">
      <h1 className="text-gray-500 dark:text-gray-400 text-sm">
        Notification Code:
      </h1>
      <h1 className="text-black dark:text-white mt-1 text-sm">
        <Link href={"https://github.com/carreejoh/Routine-extension"} className="text-blue-500">Download the extension </Link>
        from the Chrome web store for notifications and
        functionality away from the site!
    
      </h1>
      <h1 className="text-yellow-600 italic mt-2 text-sm">Google is currently reviewing my extension. The link goes to GitHub.</h1>
      <h1 className="text-gray-500 dark:text-gray-400 text-sm mt-2">Your notification code:</h1>
      {stringLink}
    </div>
  );
}

export default StringLink;
