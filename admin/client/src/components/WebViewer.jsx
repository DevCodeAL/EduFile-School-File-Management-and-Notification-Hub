import { Modal } from "flowbite-react";
import { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';

export function WebViewerModal({fileUrl, WebViewerOpen, WebViewerClose, FileName}) {

  return (
    <>
      <Modal show={WebViewerOpen} onClose={WebViewerClose} className="flex justify-center shadow-md bg-black w-screen animate-fade">
      <div className="bg-white rounded-lg shadow-md w-full max-w-full">
        <Modal.Header>{FileName}</Modal.Header>
            <Modal.Body>
                <MyWebViewer fileUrl={fileUrl}/>
            </Modal.Body>
        </div>
      </Modal>
    </>
  );
}


const MyWebViewer = ({ fileUrl }) => {
  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer', // Correct path to the WebViewer library
        licenseKey: 'demo:1736645056518:7e89697d030000000060f261bbf757c4e28c4e39dda09058f1b6527578',
        initialDoc: fileUrl, // Dynamic file URL passed as a prop
      },
      viewer.current
    ).then((instance) => {
      const { documentViewer } = instance.Core;
      // Additional WebViewer API logic
      
      console.log('WebViewer instance loaded:', instance);
    });
    
  }, []); 

  return (
    <div className="flex justify-center">
      <div
        className="webviewer"
        ref={viewer}
        style={{ height: '100vh', width: '100%' }}
      ></div>
    </div>
  );
};

export default MyWebViewer;
