import { useRef, useEffect } from "react";

function usePrevious(val) {
    const ref = useRef();
    useEffect(()=>{
        ref.current = val;
    }, [val]);
    return ref.current;
}
export default usePrevious;