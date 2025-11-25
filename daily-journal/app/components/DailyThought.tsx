"use client";
import React, { useEffect, useState } from "react";

type Thought = {
    text: string;
    time: string;
    competencies: number[];
};

type Competency = {
    id: number;
    skill: string;
    description: string;
};

export default function DailyThought() {
    //input is the variable and setInput updates it
    const [input, setInput] = useState("");
    const [thoughts, setThoughts] = useState< Thought[] >([]);
    const [competencies, setCompetencies] = useState< Competency[] > ([]);
    const [selected, setSelected] = useState<number[]>([]);

    //Load competencies from API
    useEffect(() => {
        async function fetchCompetencies() {
            const res = await fetch("/api/competencies");
            const data = await res.json();  
            setCompetencies(data);
        }
        fetchCompetencies();
    }, []);


    //Load thoughts from local storage on page load
    useEffect(() => {
        const savedThoughts = localStorage.getItem("dailyThoughts");
        if (savedThoughts) {
            setThoughts(JSON.parse(savedThoughts));
        }
    }, []);//empty dependecny array means it runs only once on page load


    //Save thoughts to local storage whenever thoughts are added
    useEffect(() => {
        localStorage.setItem("dailyThoughts", JSON.stringify(thoughts));

    }, [thoughts]);

    

    //Handle saving a thought 
    const handleSave = () => {
        if (input.trim() === "") { return };

        //Create Timestamp
        const now = new Date(); 
        const timestamp = now.toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        const newThought = { text: input, time: timestamp, competencies: selected };
        setThoughts([newThought, ...thoughts]);
        setInput("");
    }

    const toggleCompetency = (id: number) => {
        setSelected((prev) => 
        prev.includes(id) ? prev.filter((c) => c!== id) : [...prev, id]
        );
    };

    return (

        <div className= "bg-blue-600 text-white p-6 rounded-xl shadow-md text-center max-w-md w-full ">
            <h2 className =" text-xl font bold mb-3"> Daily Thoughts </h2>
            <textarea
                value = {input}
                onChange = {(e) => setInput(e.target.value)}
                placeholder = "Type your thoughts for the day..."
                className="w-full p-2 rounded-md focus: outline-none"
            /><div className = "mt-4 text-left">
                <h3 className = "font-semibold mb-2"> Employability Competencies: </h3>
                <div className = "space-y-1 ">
                    {
                        competencies.map((comp) => (
                            <label
                                key={comp.id}
                                title = {comp.description}
                                className = "flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className = "cursor-pointer"
                                    checked = {selected.includes(comp.id)}
                                    onChange = {() => {toggleCompetency(comp.id)}}
                                />
                                <span>{comp.skill}</span>
                            </label>
                        ))}
                </div>
            </div>
            <button
                onClick = {handleSave}
                className = "mt-3 bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors cursor-pointer">
                Save Thought
            </button>

            <div className = "mt-4 text-left">
                {thoughts.length === 0? (<p className = "italic text-center"> No thoughts yet. Start Typing! </p> ): (
                    thoughts.slice(0,5).map((thought, index) => (
                        <div 
                            key={index}
                            className = "bg-white/20 p-3 rounded-lg shadow-sm mb-2">
                            <p className = " text-lg">{thought.text}</p>
                            <p className = " text-sm opacity-80 mt-1">{thought.time}</p>
                        </div>

                    ))
                )}
            </div>
        </div>
    );
}