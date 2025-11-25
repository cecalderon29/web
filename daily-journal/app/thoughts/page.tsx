"use client";
import React, { useEffect, useState } from "react";


export default function thoughts(){
    const [thoughts, setThoughts] = useState<{ text: string; time: string }[]>([]);

    //Load thoughts from local storage on page load
        useEffect(() => {
            const savedThoughts = localStorage.getItem("dailyThoughts");
            if (savedThoughts) {
                setThoughts(JSON.parse(savedThoughts));
            }
        }, []);//empty dependecny array means it runs only once on page load




    return(
        <div className = " max-w-2xl w-full bg-blue-200 p-6 rounded-lg shadow-md mt-5 "> 
            <h2 className = " text-2xl font-bold mb-4 text-blue-900"> All My Thoughts </h2>
            <div className = "space-y-4">
                {thoughts.length === 0? (<p className = "italic text-center"> No thoughts yet. Start Typing! </p> ): (
                    thoughts.map((thought, index) => (
                        <div 
                            key={index}
                            className = "bg-white/20 p-3 rounded-lg shadow-sm mb-2">
                            <p className = " text-lg text-blue-950">{thought.text}</p>
                            <p className = " text-sm opacity-80 mt-1 text-blue-950">{thought.time}</p>
                        </div>

                    ))
                )}
            </div>
        </div>
    );
}