import { editModalMarginLeft, timeStart } from "../verify/lengthArrays";

function TaskBlockEdit({marginLeft}) {


  return (
    <div
      className={`bg-darkestBaseGray h-72 w-[400px] ${marginLeft} z-[9999] rounded-lg `}
    ></div>
  );
}

export default TaskBlockEdit;
