// import { Button } from "@base-ui/react"
// import { AlignJustify } from "lucide-react"



// const POSHeader= ()=>{
//     const {setSidebarOpen}= useSidebar();
//     return (
//         <div className="bg-card border-b px-6 py-4">
//             <div className="flex items-center justify-between">
//                 <div>
//                     <Button 
//                     onClick={()=>setSidebarOpen(true)}
//                     >
//                         <AlignJustify/>
//                     </Button>
//                 </div>
//                 <div>
//                     <h1 className="text-2xl font-bold">POS Terminal</h1>
//                     <p className="text-sm text-muted-foreground">Welcome to the POS Terminal</p>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default POSHeader


import { useEffect, useState } from "react"
import { AlignJustify, Clock, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "../../../../context/hook/useSidebar"
import { getSessionUser } from "@/utils/session"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { logout } from "@/Redux Toolkit/features/Auth/authSlice"

const POSHeader = () => {
    const { setSidebarOpen } = useSidebar()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = getSessionUser()
    const [now, setNow] = useState(new Date())

    function handleLogout() {
        dispatch(logout())
        navigate("/login", { replace: true })
    }

    // keep the clock ticking every second
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <header className="bg-card border-b px-6 py-4">
            <div className="flex items-center justify-between gap-4">
                {/* Left: menu button + title */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open sidebar"
                    >
                        <AlignJustify className="h-5 w-5" />
                    </Button>

                    <div>
                        <h1 className="text-2xl font-bold">POS Terminal</h1>
                        <p className="text-sm text-muted-foreground">
                            Welcome to the POS Terminal
                        </p>
                    </div>
                </div>

                {/* Right: date/time + cashier */}
                <div className="flex items-center gap-3 text-sm text-muted-foreground sm:gap-6">
                    <div className="hidden sm:flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                            {now.toLocaleDateString("en-IN", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                            {" · "}
                            {now.toLocaleTimeString("en-IN")}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{user?.fullName || "Cashier"}</span>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                        aria-label="Sign out"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="hidden sm:inline">Sign out</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default POSHeader
