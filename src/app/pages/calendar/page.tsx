"use client";
import { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import useGlobalHooks from "@/components/shared/hooks/global-hooks";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import GenericModal from "@/components/shared/components/generic-modal";
import { IEventExtendedProps } from "@/components/interface/global-interface";
import YearFilter from "@/components/shared/components/filter-year";

interface Event {
  extendedProps: IEventExtendedProps;
  start: string;
}

interface EventInfo {
  event: Event;
}
const Calendar = () => {
  const {
    handleFormatAmount,
    isModalOpen,
    updateData,
    handleEdit,
    handleDelete,
    setIsModalOpen,
  } = useGlobalHooks();
  const { shareContext } = useShareContextHooks();
  const {
    combinedData,
    currency,
    isGenericModal,
    modalHeader,
    filterYear,
    setSelectedKeys,
    setFilterYear,
  } = shareContext;
  const [calendarMonth, setCalendarMonth] = useState<number>();
  const calendarRef = useRef<FullCalendar | null>(null);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth =
    calendarMonth === 0 ? currentDate.getMonth() + 1 : currentDate.getMonth();

  const newDate =
    filterYear === String("All") || filterYear === ""
      ? new Date(
          currentYear,
          calendarMonth !== undefined ? calendarMonth : currentMonth,
          1
        )
      : new Date(
          Number(filterYear),
          calendarMonth !== undefined ? calendarMonth : currentMonth,
          1
        );

  useEffect(() => {
    if (calendarRef.current) {
      requestAnimationFrame(() => {
        const calendarApi = calendarRef.current?.getApi();
        calendarApi?.gotoDate(newDate);
      });
    }
  }, [newDate]);

  const sortedData = combinedData.sort((a, b) => {
    return (
      new Date(b.updatedAt ?? "").getTime() -
      new Date(a.updatedAt ?? "").getTime()
    );
  });

  const customTodayButton = {
    text: "Go to Today",
    click: () => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current?.getApi();
        calendarApi?.gotoDate(currentDate);
        setFilterYear("All");
        setSelectedKeys(new Set(["All"]));
      }
    },
  };

  const handleDatesSet = () => {
    if (filterYear === "All") return;
    if (calendarRef.current) {
      requestAnimationFrame(() => {
        const calendarApi = calendarRef.current?.getApi();
        const date = calendarApi?.getDate();
        const month = date?.getMonth();
        setCalendarMonth(month);
      });
    }
  };

  const renderEventContent = (eventInfo: EventInfo) => {
    const { type, amount, category, frequency, paymentMethod, note } =
      eventInfo.event.extendedProps;
    const eventDate = new Date(eventInfo.event.start);
    eventDate.setHours(8, 0, 0, 0);
    const date = eventDate.toISOString();

    const combineUpdateData = {
      ...eventInfo.event.extendedProps,
      date,
    };

    const title =
      type === "income"
        ? "Income"
        : type === "expense"
        ? "Expense"
        : "Transfer";

    return (
      <div className="w-full overflow-auto">
        <Popover placement="top" offset={20} showArrow>
          <div className="w-full h-full bg-primary flex flex-wrap 3xl:flex-nowrap gap-2 3xl:gap-4">
            <PopoverTrigger>
              <Button className="w-full h-full p-2 border-0 rounded-none justify-start bg-transparent">
                <div className="w-full h-full flex flex-col items-start gap-0 justify-start">
                  <h5 className="text-sm font-semibold text-neutral-light">{`${
                    frequency ? frequency : ""
                  } ${title} `}</h5>
                  <h6 className="text-xs font-medium text-neutral-light">
                    {handleFormatAmount(amount as number, currency as string)}
                  </h6>
                </div>
              </Button>
            </PopoverTrigger>
            <div className="flex gap-2 p-2 justify-end w-full 3xl:w-auto">
              <div className="flex items-center justify-center">
                <button onClick={() => handleEdit(type, combineUpdateData)}>
                  <span className="text-success-300 text-lg hover:text-neutral-light80">
                    <FaEdit />
                  </span>
                </button>
              </div>
              <div className="flex items-center justify-center">
                <button onClick={() => handleDelete(type, combineUpdateData)}>
                  <span className="text-danger-300 text-lg hover:text-neutral-light80">
                    <MdDelete />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <PopoverContent className="">
            <div className="px-1 py-2">
              <ul className="flex flex-col gap-1">
                <li className="mb-4">
                  <div className="w-full h-full flex flex-col items-start gap-0 justify-start">
                    <h5 className="text-base font-bold text-quaternary">{`${
                      frequency ? frequency : ""
                    } ${title} `}</h5>
                    <h6 className="text-base font-medium text-quaternary">
                      <mark>
                        {handleFormatAmount(
                          amount as number,
                          currency as string
                        )}
                      </mark>
                    </h6>
                  </div>
                </li>
                <li>
                  <p className="text-sm text-quaternary">
                    <span className="font-semibold">Category:</span> {category}
                  </p>
                </li>
                <li>
                  <p className="text-sm text-quaternary">
                    <span className="font-semibold">Payment Method:</span>{" "}
                    {paymentMethod}
                  </p>
                </li>
                <li>
                  <p className="text-sm text-quaternary">
                    <span className="font-semibold">Note:</span>{" "}
                    {note ? note : "N/A"}
                  </p>
                </li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  return (
    <div className="custom-container flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-full justify-between">
        <h1 className="text-3xl font-bold text-primary">Calendar</h1>
        <div className="flex items-center gap-4 justify-end">
          <p className="text-base font-semibold text-quaternary">
            Filter Year:
          </p>
          <YearFilter />
        </div>
      </div>

      <div className="card">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={sortedData}
          eventContent={renderEventContent}
          initialDate={newDate.toISOString().split("T")[0]}
          customButtons={{
            today: customTodayButton,
          }}
          datesSet={handleDatesSet}
        />
        <GenericModal
          isGenericModal={isGenericModal}
          isModalOpen={isModalOpen}
          header={modalHeader}
          isUpdate={true}
          updateData={updateData}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  );
};
export default Calendar;
