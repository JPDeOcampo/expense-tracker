import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
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
                <GenericTabs />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
                <Button color="primary" onClick={handleCloseModal}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GenericModal;
