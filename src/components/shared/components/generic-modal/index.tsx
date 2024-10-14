import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";

import GenericTabs from "../generic-tabs";
const GenericModal = ({ isModalOpen, setIsModalOpen }: any) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
 
  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={isModalOpen}
        placement={"center"}
        onOpenChange={() => handleCloseModal()}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add</ModalHeader>
              <ModalBody>
                <GenericTabs handleCloseModal={handleCloseModal} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GenericModal;
