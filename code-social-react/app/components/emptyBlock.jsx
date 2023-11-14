import { timeStart } from "../verify/lengthArrays";

function EmptyBlock({startTime, dateIndex}) {

    return(
        <div className={`${timeStart[startTime]}  p-2 w-[124px] h-48 shadow-sm bg-transparent dark:bg-darkBaseGray fixed rounded-lg z-30 border-[1px] border-lightestGray`}>
            {/* <h1 className="text-xs text-lightestGray">Empty</h1> */}
        </div>
    )
}

export default EmptyBlock;