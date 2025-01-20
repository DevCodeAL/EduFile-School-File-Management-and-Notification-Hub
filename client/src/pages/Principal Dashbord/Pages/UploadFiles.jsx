export default function UploadFiles() {
    return (
      <>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <main className="flex-1 p-6 ml-64">
            {/* Videos Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Title Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Video Card */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src="https://www.youtube.com/embed/example"
                      title="Video Example"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-700">Videos</h3>
                    <p className="text-sm text-gray-500">Uploaded on 01/20/2025</p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      Download Video
                    </button>
                  </div>
                </div>
                {/* Additional Video Cards can go here */}
              </div>
            </section>
  
            {/* PDFs Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Files</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* PDF Card */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="p-6 bg-gray-100 flex justify-center items-center">
                    <span className="text-6xl text-gray-400 material-icons">picture_as_pdf</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-700">PDF Title</h3>
                    <p className="text-sm text-gray-500">Uploaded on 01/20/2025</p>
                    <a
                      href="/path-to-pdf.pdf"
                      download
                      className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 block text-center"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
                {/* Additional PDF Cards can go here */}
              </div>
            </section>
          </main>
        </div>
      </>
    );
  }
  