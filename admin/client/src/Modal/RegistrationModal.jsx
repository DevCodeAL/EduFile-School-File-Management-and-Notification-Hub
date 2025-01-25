import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { createPrincipal } from "../Services/ItemServices";

export default function CreateModal({ openModal, setOpenModal }) {
  const [createUser, setCreateUser] = useState({role: '', school: '', fullname: '', email: '', password: ''});
  
  const HandleOnchange = (event)=>{
    const { name, value } = event.target;
      setCreateUser({
          ...createUser,
          [name]: value,
      });
  };


  async function HandleFormSubmit(e) {
      e.preventDefault();
      try {
         const response = await createPrincipal(createUser);
         setCreateUser({
          role: '', school: '', fullname: '', email: '', password: '',
         });
         console.log(response.data);
         setOpenModal(false);
      } catch (error) {
        console.error({message: 'Error', error});
      }
  }


  return (
    <>
      <Modal show={openModal} popup onClose={setOpenModal}>
        <Modal.Body className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="p-6 rounded-lg shadow-lg w-full max-w-md bg-white relative">
            <button 
              className="absolute font-bold top-2 right-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setOpenModal(false)}
            >
              X
            </button>
            <Modal.Body>
            <h1 className="relative left-0 right-0 inset-0 text-center text-black font-bold">Add Principal</h1>
           <form onSubmit={HandleFormSubmit}>
            <div className="space-y-6">
            <div>
            <Label htmlFor="role" value="Select Role" />
                  <select onChange={HandleOnchange} value={createUser.role} name="role"  className="w-full rounded-lg mb-3"  id="role" required>
                    <option value="">Select...</option>
                    <option value="principal">Principal</option>
                  </select>
                </div>
                </div>

              <div className="space-y-6">
            <div>
                <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="role"
              >
                School
              </label>
              <select
               onChange={HandleOnchange}
               value={createUser.school}
               name="school"
              id="school"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select School</option>
              {[...Array(28)].map((_, index) => (
                <option key={index + 1} value={`school${index + 1}`}>
                  School {index + 1}
                </option>
              ))}
            </select>
                </div>
                <div>
                  <Label htmlFor="fullName" value="Full Name" />
                  <TextInput onChange={HandleOnchange} value={createUser.fullname} name="fullname" id="fullName" placeholder="Enter full name" required />
                </div>
                <div>
                  <Label htmlFor="email" value="Email" />
                  <TextInput id="email" onChange={HandleOnchange} value={createUser.email} name="email" placeholder="name@company.com" required />
                </div>
                <div>
                  <Label htmlFor="password" value="Password" />
                  <TextInput onChange={HandleOnchange} value={createUser.password} name="password" id="password" type="password" required />
                </div>
               
                <div>
                  <Button type="submit" className="bg-blue-500 w-full">Create</Button>
                </div>
              </div>
            </form>
            </Modal.Body>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
