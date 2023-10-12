
function EmptyBlock({startTime, dateIndex}) {

    const timeStart = {
        2500: "ml-[0px]",
        2530: "ml-[128px]",
        100: "ml-[258px]",
        130: "ml-[384px]",
        200: "ml-[512px]",
        230: "ml-[640px]",
        300: "ml-[768px]",
        330: "ml-[896px]",
        400: "ml-[1024px]",
        430: "ml-[1152px]",
        500: "ml-[1280px]",
        530: "ml-[1408px]",
        600: "ml-[1536px]",
        630: "ml-[1664px]",
        700: "ml-[1792px]",
        730: "ml-[1920px]",
        800: "ml-[2048px]",
        830: "ml-[2176px]",
        900: "ml-[2304px]",
        930: "ml-[2432px]",
        1000: "ml-[2560px]",
        1030: "ml-[2688px]",
        1100: "ml-[2816px]",
        1130: "ml-[2944px]",
        1200: "ml-[3072px]",
        1230: "ml-[3200px]",
        1300: "ml-[3328px]",
        1330: "ml-[3456px]",
        1400: "ml-[3584px]",
        1430: "ml-[3712px]",
        1500: "ml-[3840px]",
        1530: "ml-[3968px]",
        1600: "ml-[4096px]",
        1630: "ml-[4224px]",
        1700: "ml-[4352px]",
        1730: "ml-[4480px]",
        1800: "ml-[4608px]",
        1830: "ml-[4736px]",
        1900: "ml-[4864px]",
        1930: "ml-[4992px]",
        2000: "ml-[5120px]",
      };

    return(
        <div className={`${timeStart[startTime]}  p-2 w-[124px] h-48 bg-darkBaseGray fixed rounded-lg z-30 border-[1px] border-lightestGray`}>
            {/* <h1 className="text-xs text-lightestGray">Empty</h1> */}
        </div>
    )
}

export default EmptyBlock;