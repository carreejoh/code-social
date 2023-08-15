import Link from "next/link";

function NavBtn({ link, text, textColor }) {
    return(
        <Link href={link}>
            <h1 className={`text-md text-${textColor}`}>{text}</h1>
        </Link>
    )   
}

export default NavBtn;