import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { createPrincipal } from "../Services/ItemServices";
import CreateLoading from "../LoadingAdmin/CreateLoading";

export default function CreateModal({ openModal, setOpenModal }) {
  const [isLoading, setLoading] = useState(false);
  const [createUser, setCreateUser] = useState({role: '', school: '', fullname: '', email: '', password: ''});
  
  const HandleOnchange = (event)=>{
    const { name, value } = event.target;
      setCreateUser({
          ...createUser,
          [name]: value,
      });
  };


  async function HandleFormSubmit(e) {
    setLoading(true);
      e.preventDefault();
      try {
         const response = await createPrincipal(createUser);
         setCreateUser({
          role: '', school: '', fullname: '', email: '', password: '',
         });
         console.log(response.data);
        setTimeout(()=>{
          setOpenModal(false);
          setLoading(false);
        }, 1000);
         
      } catch (error) {
        console.error({message: 'Error', error});
      }
  }


  return (
    <>
      <Modal show={openModal} popup onClose={setOpenModal}>
        <Modal.Body className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="p-3 rounded-lg shadow-lg w-full max-w-md bg-white relative">
            <button 
              className="absolute font-bold top-2 right-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setOpenModal(false)}
            >
              X
            </button>

          {isLoading && (
              <CreateLoading/>
          )}

            <Modal.Body>
            <h1 className="relative left-0 right-0 inset-0 text-center text-black font-bold">Add Principal</h1>
           <form onSubmit={HandleFormSubmit}>
            <div className="space-y-6">
            <div>
            <Label htmlFor="role" value="Select Role" />
                  <select onChange={HandleOnchange} value={createUser.role} name="role"  className="w-full rounded-lg mb-3 border-slate-300"  id="role" required>
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
              className="w-full px-4 py-2 border rounded-lg  border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select School</option>
              <option value="Ayos Lomboy Elementary School">Ayos Lomboy Elementary School</option>
              <option value="Bantug Elementary School">Bantug Elementary School</option>
              <option value="Bunol Integrated School">Bunol Integrated School</option>
              <option value="Caballero Elementary School">Caballero Elementary School</option>
              <option value="Cabaruan Elementary School">Cabaruan Elementary School</option>
              <option value="Camiing Elementary School">Camiing Elementary School</option>
              <option value="Cavite Elementary School">Cavite Elementary School</option>
              <option value="Cawayang Bugtong Elementary School">Cawayang Bugtong Elementary School</option>
              <option value="Consuelo Elementary School">Consuelo Elementary School</option>
              <option value="Culong Elementary School">Culong Elementary School</option>
              <option value="Don Pedro Elementary School">Don Pedro Elementary School</option>
              <option value="Faigal Elementary School">Faigal Elementary School</option>
              <option value="Guimba East Central School">Guimba East Central School</option>
              <option value="Guiset Elementary School">Guiset Elementary School</option>
              <option value="Manacsac Elementary School">Manacsac Elementary School</option>
              <option value="Mataranoc Elementary School">Mataranoc Elementary School</option>
              <option value="Naglabrahan Elementary School">Naglabrahan Elementary School</option>
              <option value="Nagpandayan Elementary School">Nagpandayan Elementary School</option>
              <option value="San Andres Elementary School">San Andres Elementary School</option>
              <option value="San Bernardino Integrated School">San Bernardino Integrated School</option>
              <option value="San Marcelino Integrated School">San Marcelino Integrated School</option>
              <option value="San Roque Elementary School">San Roque Elementary School</option>
              <option value="Sinulatan Elementary School">Sinulatan Elementary School</option>
              <option value="Sta. Ana Integrated School">Sta. Ana Integrated School</option>
              <option value="Sta. Cruz Elementary School">Sta. Cruz Elementary School</option>
              <option value="Sta. Lucia Elementary School">Sta. Lucia Elementary School</option>
              <option value="Triala Elementary School">Triala Elementary School</option>    
            </select>
                </div>
                <div>
                  <Label htmlFor="fullName" value="Full Name" />
                  <TextInput onChange={HandleOnchange} value={createUser.fullname} name="fullname" id="fullName" placeholder="Enter full name" required />
                </div>
                <div>
                  <Label htmlFor="email" value="Email" />
                  <TextInput id="email" onChange={HandleOnchange} value={createUser.email} name="email" placeholder="name@gmail.com" required />
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
