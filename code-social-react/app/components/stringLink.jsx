"use client"
import { useEffect, useState } from "react";

function StringLink({ stringLink }) {

    return(
        <div className="col-span-1 p-2">
            <h1 className="text-gray-500 dark:text-gray-300 text-sm">Notification Code:</h1>
            {stringLink}
        </div>
    )
}

export default StringLink;