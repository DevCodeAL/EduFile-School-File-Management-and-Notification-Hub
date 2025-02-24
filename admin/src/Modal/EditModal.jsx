import { Button, Label, Modal, TextInput } from "flowbite-react";

export default function UpdateModal({ EditopenModal, EditsetOpenModal }) {
  return (
    <>
      <Modal show={EditopenModal} popup onClose={EditsetOpenModal}>
        <Modal.Body className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-lg w-full max-w-md bg-white relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => EditsetOpenModal(false)}
            >
              X
            </button>
            <Modal.Body>
            <div className="space-y-6">
            <div>
            <Label htmlFor="role" value="Select Role" />
                  <select  className="w-full rounded-lg mb-3"  id="role" required>
                    <option value="">Select...</option>
                    <option value="principal">Principal</option>
                  </select>
                </div>
                </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="schoolName" value="School Name" />
                  <TextInput id="schoolName" placeholder="Enter school name" required />
                </div>
                <div>
                  <Label htmlFor="fullName" value="Full Name" />
                  <TextInput id="fullName" placeholder="Enter full name" required />
                </div>
                <div>
                  <Label htmlFor="email" value="Email" />
                  <TextInput id="email" placeholder="name@company.com" required />
                </div>
                <div>
                  <Label htmlFor="password" value="Password" />
                  <TextInput id="password" type="password" required />
                </div>
               
                <div>
                  <Button className="bg-blue-500 w-full">Create</Button>
                </div>
              </div>
            </Modal.Body>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
