import { useContext } from "react"
import { SidebarContext } from "../SidebarContext"

export const useSidebar =()=>{
    const context= useContext(SidebarContext);
    if(!context){

        throw new Error("use Sidbar must be used within SidebarProvider")
    }
    return context;
}