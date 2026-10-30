import { useContext } from "react";

import PosContext from "../context/PosContext";

const usePos = () => useContext(PosContext);

export default usePos;