import { Users } from 'lucide-react';
import React from 'react'
import SquadProfile from './SquadProfile';
import { useDispatch } from 'react-redux';
import { dialogState } from '../Features/dialogSlice';
import { Link } from 'react-router-dom';

const RecommendedSquads = () => {
    const dispatch = useDispatch()
    const filteredGroups = [
        {
            id: 1,
            name: "Digital Dreamers",
            description: "A collective of creative minds pushing the boundaries of digital art",
            members: 128,
            imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: 2,
            name: "Tech Innovators",
            description: "Building tomorrow's solutions with cutting-edge technology",
            members: 95,
            imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: 3,
            name: "Creative Pulse",
            description: "Where creativity meets collaboration in perfect harmony",
            members: 156,
            imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: 2,
            name: "Tech Innovators",
            description: "Building tomorrow's solutions with cutting-edge technology",
            members: 95,
            imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: 3,
            name: "Creative Pulse",
            description: "Where creativity meets collaboration in perfect harmony",
            members: 156,
            imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: 2,
            name: "Tech Innovators",
            description: "Building tomorrow's solutions with cutting-edge technology",
            members: 95,
            imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: 3,
            name: "Creative Pulse",
            description: "Where creativity meets collaboration in perfect harmony",
            members: 156,
            imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: 2,
            name: "Tech Innovators",
            description: "Building tomorrow's solutions with cutting-edge technology",
            members: 95,
            imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: 3,
            name: "Creative Pulse",
            description: "Where creativity meets collaboration in perfect harmony",
            members: 156,
            imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400"
        }
    ];
    return (
        <div className="min-h-screen ">
            <div className="container mx-auto px-4 py-12">
                {/* Groups Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredGroups.map((group) => (
                        <div
                            key={group.id}
                            className="bg-white backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:transform hover:scale-105 transition-all duration-300"
                        >
                            <img
                                src={group.imageUrl}
                                alt={group.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-purple-400 mb-2">{group.name}</h3>
                                <p className=" mb-4">{group.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Users className="w-5 h-5 mr-2" />
                                        <span>{group.members} members</span>
                                    </div>
                                    <Link to="/squads_profile" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm font-medium transition-colors duration-300" style={{ background: 'linear-gradient(to bottom right, #d24df7, #7000f0)'}}>
                                        Join Group
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecommendedSquads