"use client";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../redux/reducers/counterSlice";

function Blah() {

    const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

    return(
        <div>
            <button
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
            <span>{count}</span>
        </div>
    )
}

export default Blah;