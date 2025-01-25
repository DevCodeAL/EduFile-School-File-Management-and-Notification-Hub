
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function FileDeleteModal({isdeleteOpenFile, setisDeleteOpenFile}) {


  return (
    <>
      <Modal show={isdeleteOpenFile} size="md" onClose={setisDeleteOpenFile} popup>
        <Modal.Header />
        <Modal.Body className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="p-6 rounded-lg shadow-lg w-full max-w-md bg-white relative">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this file?
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="bg-red-600" onClick={() =>  setisDeleteOpenFile(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() =>  setisDeleteOpenFile(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
