import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dialogState } from '../Features/dialogSlice';

function SquadProfile({ setOpen }) {
    const [members] = useState([
        { id: 1, name: 'John Doe', role: 'Leader' },
        { id: 2, name: 'Jane Smith', role: 'Member' },
        { id: 3, name: 'Mike Johnson', role: 'Member' },
        { id: 4, name: 'Alice Brown', role: 'Member' },
        { id: 5, name: 'Chris Green', role: 'Member' },
        { id: 6, name: 'Patricia White', role: 'Member' }
    ]);
    const dispatch = useDispatch();

    return (
        <div className="w-full min-h-[89vh] flex justify-center items-center">
            <div className="w-4/5 h-[80vh] bg-white rounded-lg overflow-hidden relative shadow-2xl">

                <div className="p-6">
                    <div className="flex items-center justify-between space-x-4 mb-3">
                        <div className='flex gap-4'>
                            <div className="w-16 h-16 rounded-full overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&crop=faces&auto=format&q=90"
                                    alt="Group"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-800">Web Development Group</h1>
                                <div className="text-lg font-semibold text-gray-700">Group ID: 123456</div>
                            </div>
                        </div>
                        <button className=" text-white px-6 py-2 rounded-full" style={{background: `linear-gradient(to bottom right, #d24df7,#7000f0)`}}>
                            JOIN
                        </button>
                    </div>

                    <div className="mb-2">
                        <p className="text-gray-600">
                            A collaborative group focused on learning and sharing knowledge about modern web development technologies,
                            including React, Node.js, and cloud computing. Join us to enhance your development skills!
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Members</h3>
                        <div className="grid grid-cols-4 gap-2.5 overflow-y-auto max-h-48">
                            {members.map((member) => (
                                <div key={member.id} className="flex items-center space-x-3 p-3 bg-gradient-to-br from-purple-200 to-blue-200 rounded-lg">
                                    <div className="w-10 h-10 custom-gradient rounded-full bg-purple-400 flex items-center justify-center text-white font-medium text-xl">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-800">{member.name}</div>
                                        <div className="text-sm text-gray-500">{member.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SquadProfile;