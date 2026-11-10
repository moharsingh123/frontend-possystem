import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"

export function TextareaDemo() {
  return <Textarea placeholder="Type your message here." />
}

// import { Select, SelectContent } from '@/components/ui/select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react'
import { Button } from '@/components/ui/button';


const returnReasons=["Wrong product", "Damage Product" , "Not interested any more" , "Not Satisfied" , "Others"]

const refundMethods= ["UPI" ,"CARD" , "CASH"];


const ReturnItemsSection = ({ selectedOrder, setShowReturnReciptDialog }) => {
    const [returnReason , setReturnReason]= useState("")
    const [otherReason , setOtherReason] = useState("")
    const [refundMethod , setRefundMethod]= useState("UPI")

    // precess to call the returnReciptDialog
    const processRefund = () => {
        setShowReturnReciptDialog(true);
    }
    
    return(
        <div className='p-4 w-1/2'>
            <Card className={"p-4"}>
                <CardContent className={"p-4"}>
                    <div className="space-y-4">
                        <div >
                            <Label className={"mb-4 block"}>Return Reason</Label>
                            <Select
                             value={returnReason}
                            onValueChange={(value) => setReturnReason(value)}
                            >
                                <SelectTrigger className={"w-full"}>
                                    <SelectValue placeholder='Select A Reason..'/>
                                </SelectTrigger>
                                <SelectContent>
                                    {returnReasons.map((reason)=>(
                                        <SelectItem  value={reason} key={reason}>
                                            {reason}
                                        </SelectItem>
                                    ))}
                                </SelectContent>

                            </Select>
                           
                        </div>
                        
                            {
                                returnReason.toLowerCase() === "others"
                                 &&(
                                    <div>
                                        <Label className='mb-4'>
                                            Spacific Reason
                                        </Label>
                                        <Textarea 
                                        id='other-reason'
                                         placeholder='Please specify the return resson '
                                            value={otherReason}
                                            onChange={(event)=>setOtherReason(event.target.value)}
                                         />
                                        
                                    </div>
                                    )
                            }
                        
                        <div>
                            <Label>
                                Refund Method    
                            </Label> 
                            <Select
                             value={refundMethod}
                            onValueChange={(value) => setRefundMethod(value)}
                            >
                                <SelectTrigger className={"w-full"}>
                                    <SelectValue placeholder='Select A Refund Method..'/>
                                </SelectTrigger>
                                <SelectContent>
                                    {refundMethods.map((method)=>(
                                        <SelectItem  value={method} key={method}>
                                            {method}
                                        </SelectItem>
                                    ))}
                                </SelectContent>

                            </Select> 
                        </div>
                        <div className="pt-5 border-t">
                            <div className='flex justify-baseline text-lg font-semibold'>
                                    <span>Total Refund Amount</span>
                                    <span>₹{selectedOrder.totalAmount}</span>
                            </div>
                            <Button onClick={processRefund} className={"w-full py-6 mt-5"}>
                                    Process Refund
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
export default ReturnItemsSection;