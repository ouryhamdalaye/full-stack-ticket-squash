"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function TicketsPage() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        async function loadTickets() {
            const { data: session } = await supabase.auth.getSession();
            if(!session.session) return;

            const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`, {
                headers: {
                    Authorization: `Bearer ${session.session.access_token}`,
                },
            });

            if(!res.ok) throw new Error('Failed to fetch tickets');
            const data = await res.json();
            setTickets(data);
        }
        loadTickets();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Tickets</h1>
            <ul className="grid gap-4">
                {tickets.map((ticket: any) => (
                    <li key={ticket.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
                        <h2 className="text-lg font-semibold text-gray-700">{ticket.title}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
}