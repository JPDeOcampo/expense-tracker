"use client";
import { useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import GroupField from "../group-field";

const GenericTabs = () => {
  const [isDateFocus, setIsDateFocus] =useState(false)
  const Form = () => {
    return(
        <div>
          <form>
          <GroupField
          label="date"
          type="date"
          name="date"
          isFocused={isDateFocus}
          setIsFocused={setIsDateFocus}
        />
          </form>
        </div>
    );
  }

  let tabs = [
    {
      id: "photos",
      label: "Photos",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "music",
      label: "Music",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: "videos",
      label: "Videos",
      content:
       <Form />
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <Card>
              <CardBody>{item.content}</CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
export default GenericTabs;
