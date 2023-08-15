import Link from "next/link";

function SidebarIcons({ icon, onClick }) {
  return (
    <div className="mt-4 flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-7 h-7 mx-auto"
        onClick={onClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={icon}
        />
      </svg>
    </div>
  );
}

export default SidebarIcons;