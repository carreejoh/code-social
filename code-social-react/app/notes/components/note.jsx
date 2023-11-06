function Note({size, title}) {

    const noteSize = {
        "large": "col-span-2",
        "small": "col-span-1"
    }

    return(
        <div className={`h-52 bg-baseGray ${noteSize[size]} p-2`}>
            <h1 className="text-md font-semibold">{title}</h1>
        </div>
    )
}

export default Note;