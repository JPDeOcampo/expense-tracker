"use client";
import { useContext, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ShareContext } from "@/components/shared/context/share-state";
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
import { ICombinedDataType } from "@/components/interface/global-interface";

interface Event {
  extendedProps: IEventExtendedProps;
  start: string;
}

interface EventInfo {
  event: Event;
}
const Calendar = () => {
  const {
    combinedData,
    currency,
    isGenericModal,
    setIsGenericModal,
    modalHeader,
    setModalHeader,
  } = useContext(ShareContext) ?? {
    combinedData: [],
  };

  const { handleFormatAmount } = useGlobalHooks();
  const { shareContext } = useShareContextHooks();
  const { setSelectedTabs } = shareContext;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<IEventExtendedProps>();

  const sortedData = combinedData.sort((a, b) => {
    return (
      new Date(b.createdAt ?? "").getTime() -
      new Date(a.createdAt ?? "").getTime()
    );
  });

  const handleEdit = (type: string, data: IEventExtendedProps) => {
    setIsModalOpen(true);
    setSelectedTabs(type);
    setUpdateData(data);
    setIsGenericModal?.("add-item");
    setModalHeader?.("Update");
  };

  const handleDelete = (type: string, data: IEventExtendedProps) => {
    const updatedData = {
      ...data,
      amount: handleFormatAmount(Number(data.amount), String(currency)),
      date: new Date(data.date ?? "").toISOString().split("T")[0],
    };

    setUpdateData(updatedData);
    setIsModalOpen(true);
    setIsGenericModal?.("delete-item");
    setModalHeader?.(`Delete ${type}`);
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
          <div className="w-full h-full bg-primary flex gap-4">
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
            <div className="flex gap-2 px-2">
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
                    <h6 className="text-sm font-medium text-quaternary">
                      {" "}
                      {handleFormatAmount(amount as number, currency as string)}
                    </h6>
                  </div>
                </li>
                <li>
                  <span className="text-base text-quaternary">
                    Category: {category}
                  </span>
                </li>
                <li>
                  <span className="text-base text-quaternary">
                    Payment Method: {paymentMethod}
                  </span>
                </li>
                <li>
                  <span className="text-base text-quaternary">
                    Note: {note ? note : "N/A"}
                  </span>
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
      <h1 className="text-3xl font-bold text-primary">Calendar</h1>
      <div className="card">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={sortedData}
          eventContent={renderEventContent}
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
