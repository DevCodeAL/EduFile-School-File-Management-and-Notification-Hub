"use client";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function AlertWarning() {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <Modal show={openModal} size="md" onClose={() => {
        setOpenModal(false);
        location.reload();
      }} popup>
      <Modal.Header />
        <Modal.Body className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="p-6 rounded-lg shadow-lg w-full max-w-md bg-white relative">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-center font-normal text-gray-500 dark:text-gray-400">
              Invalid email or password!
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="bg-red-600" onClick={()=> {
                setOpenModal(false);
                location.reload();
              }}>
                {"Close"}
              </Button>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
}
