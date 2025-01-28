import { useEffect, useState } from "react";
import { getAllFiles } from "../../../services/Api";
import UploadFiles from "./UploadFiles";

export default function FileUploaded(){
    const [files, setFiles] = useState([]);

    const fetchFiles = async ()=>{
        try {
          const response = await getAllFiles(files);
          setFiles(response);
          console.log(response);
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        }
    }
    
    useEffect(()=>{
      fetchFiles();
      }, []);


      return(
        <>
           {files.map(file => {
               <UploadFiles key={file._id} file={file}/>
           })}
        </>
      )
    
}