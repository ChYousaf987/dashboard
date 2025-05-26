import React from 'react'

const ViewAffiliates = () => {
  return (
    <div className="absolute top-20 right-0 w-[80%] p-10 bg-[#f5f5f5]">
    <div className="bg-white rounded-2xl shadow-md w-full p-8 ">
        <h2 className="text-xl font-semibold mb-4">Affiliate Settings</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Default Commission Rate (%)</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded-full" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Set Average Sales Value</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded-full" />
          </div>
        </div>
       <div className="flex justify-center gap-4 mt-6">
          <button className="bg-black text-white px-6 py-2 rounded-full">Cancel</button>
          <button className="border border-black px-6 py-2 rounded-full">Save</button>
        </div>
      </div>
      </div>
  )
}

export default ViewAffiliates
