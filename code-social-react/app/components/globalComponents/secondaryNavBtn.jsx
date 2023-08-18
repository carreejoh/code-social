import Link from "next/link";

function NavBtn({ link, text, textColor, onClick }) {
    return(
        <Link href={link} onClick={onClick}>
            <h1 className={`text-md text-${textColor}`}>{text}</h1>
        </Link>
    )   
}

export default NavBtn;