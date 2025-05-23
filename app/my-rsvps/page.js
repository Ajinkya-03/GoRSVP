"use client"
import React, { useEffect, useState } from "react";
import { getuserrsvps,getspecificevents } from "@/actions/useractions";
import { useSession, signIn, signOut } from "next-auth/react";


const Page = () => {

  const { data: session, status} = useSession();

  const [events, setEvents] = useState([]);
  const fetchEvents = async () => {
    try {
      const data = await getuserrsvps(session.user.email);
        const eventdata = await getspecificevents(data.user[0].rsvpevents);
        setEvents(eventdata.events);

    } catch (error) {
      console.error("Error fetching User:", error);
    }
  };
  useEffect(() => {
    if (status === "loading") return; 
    if (status === "unauthenticated") {
      signIn(); 
      return;
    }

    if (status === "authenticated" && session) {
      fetchEvents();
    }
  }, [session, status]);
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  const handleViewClick = (timestamp) => {
    window.location.replace(`/event/${timestamp}`);
  };
  return (
    <div className="min-h-screen bg-foregorund">
      {/* Event Dashboard */}
      <div className="flex justify-between mx-4">
        <h2 className="text-primary ml-8 text-xl mt-4 font-bold">
          My RSVPs
        </h2>
      </div>

      <div className="border-b-2 mt-6"></div>
      {/* Your Events Section */}
      <div className="flex flex-col justify-center p-4">

        <table className="ml-6 w-[96%] border-collapse text-primary bg-white rounded-lg overflow-hidden border-2 border-primary">
          <thead>
            <tr className="bg-[rgb(249,248,240)]">
              <th className="p-4 text-center font-semibold border-2  border-primary">Event Name</th>
              <th className="p-4 text-center font-semibold border-2  border-primary">Date</th>
              <th className="p-4 text-center font-semibold border-2  border-primary">Time</th>
              <th className="p-4 text-center font-semibold border-2  border-primary">Location</th>
              <th className="p-4 text-center font-semibold border-2  border-primary">Actions</th>
            </tr>
          </thead>
          {/* dynamic rows below */}
          <tbody>
            {events.map((event, index) => (
              <tr
                key={event.Timestamp}
                className={
                  index % 2 === 0 ? "bg-foreground" : "bg-[rgb(249,248,240)]"
                }
              >
                <td className="p-4 border-2 text-center border-r-2 border-primary">{event.eventTitle}</td>
                <td className="p-4 border-2 text-center border-r-2 border-primary">{new Date(event.eventDate).toLocaleDateString()}</td>
                <td className="p-4 border-2 text-center border-r-2 border-primary">{event.eventTime}</td>
                <td className="p-4 border-2 text-center border-r-2 border-primary">{event.eventLocation}</td>
                <td className="p-4 border-2 text-center border-r-2 border-primary">
                  <button className="px-3 mr-2 py-1 border-2 border-secondary text-secondary hover:text-footertext hover:bg-secondary rounded-md" onClick={()=>{handleViewClick(event.Timestamp)}}>
                    View
                  </button> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Page;
