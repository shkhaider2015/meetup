import { LoaderContext } from "@/context";
import { useContext } from "react";

export const useLoader = () => useContext(LoaderContext);