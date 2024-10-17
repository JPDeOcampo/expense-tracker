"use client";
import { useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ShareContext } from "@/components/shared/context/share-state";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

interface EventExtendedProps {
  type: string;
  amount: number;
  category: string;
  frequency: string;
  paymentMethod: string;
  note: string;
}

interface Event {
  extendedProps: EventExtendedProps;
}

interface EventInfo {
  event: Event; 
}

const Calendar = () => {
  const { combinedData } = useContext(ShareContext) ?? { combinedData: [] }; 

  const renderEventContent = (eventInfo: EventInfo ) => {
    const { type, amount, category, frequency, paymentMethod, note } =
      eventInfo.event.extendedProps;

    const title = type === "income" ? "Income" : "Expense";

    return (
      <div className="w-full overflow-auto">
        <Popover placement="top" offset={20} showArrow>
          <PopoverTrigger>
            <Button className="w-full h-full p-2 border-0 rounded-none justify-start">
              <div className="w-full h-full flex flex-col items-start gap-0 justify-start">
                <h5 className="text-sm font-semibold text-quaternary">{`${
                  frequency ? frequency : ""
                } ${title} `}</h5>
                <h6 className="text-xs font-medium text-quaternary">{`PHP ${amount}`}</h6>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="">
            <div className="px-1 py-2">
              <ul className="flex flex-col gap-1">
                <li className="mb-4">
                  <div className="w-full h-full flex flex-col items-start gap-0 justify-start">
                    <h5 className="text-base font-bold text-quaternary">{`${
                      frequency ? frequency : ""
                    } ${title} `}</h5>
                    <h6 className="text-sm font-medium text-quaternary">{`PHP ${amount}`}</h6>
                  </div>
                </li>
                <li>
                  <span className="text-base text-quaternary">Category: {category}</span>
                </li>
                <li>
                  <span className="text-base text-quaternary">Payment Method: {paymentMethod}</span>
                </li>
                <li>
                  <span className="text-base text-quaternary">Note: {note ? note : "N/A"}</span>
                </li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
  return (
    <div className="custom-container flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-primary">Calendar</h1>
      <div className="bg-neutral-light p-4 rounded-md">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={combinedData}
          eventContent={renderEventContent}
        />
      </div>
    </div>
  );
};
export default Calendar;
