
export default function PendingUsers(){
    return(
        <>
             {/* Pending Applications Section */}
             <div className="flex flex-col min-h-screen bg-gray-100">
             <main className="flex-1 p-6 ml-64">
            <section id="applications" className="mt-8 bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-700">Pending Applications</h2>
                <table className="mt-4 w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="border border-gray-300 px-4 py-2">John Doe</td>
                    <td className="border border-gray-300 px-4 py-2">john@example.com</td>
                    <td className="border border-gray-300 px-4 py-2">
                        <button className="text-green-500 hover:underline">Approve</button>
                        <button className="ml-2 text-red-500 hover:underline">Reject</button>
                    </td>
                    </tr>
                </tbody>
                </table>
            </section>
            </main>
            </div>
        </>
    )
}