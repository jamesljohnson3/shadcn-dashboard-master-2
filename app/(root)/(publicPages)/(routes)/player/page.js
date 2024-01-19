"use client"
import Player from "@/components/Player";
// import Image from "next/image";
// import ReactMarkdown from "react-markdown";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {

  const [prerollVideoURL, setPrerollVideoURL] = useState("");
  const [mainVideoURL, setMainVideoURL] = useState("");
  const [showMainVideo, setShowMainVideo] = useState(false);
  const handleSkip = () => {
    setShowMainVideo(true);
  };
  useEffect(() => {
    fetch('/api/videos')
      .then(response => response.json())
      .then(data => {
        setPrerollVideoURL(data.prerollVideoURL);
        setMainVideoURL(data.mainVideoURL);
      })
      .catch(error => console.error('Error fetching video URLs:', error));
  }, []);
  const [formState, setFormState] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    preferredName: '',
    dateOfBirth: '',
    patientId: '',
    ethnicity: '',
    race: '',
    preferredLanguage: '',
    sex: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    email: '',
    state: '',
    zip: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://hook.us1.make.com/zm99zpbgiqlqdxsjairyhqsanatci27t', {
        method: 'POST',
        body: JSON.stringify(formState),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      console.log(data); // handle successful response
    } catch (err) {
      console.error(err); // handle error response
    }
    setLoading(false);
  };
  return (
    <main className="">
     
     
     
      {showMainVideo ? (
          <Player prerollVideoURL="https://res.cloudinary.com/unlimitpotential/video/upload/v1696738639/draft_aw46lh.mp4" mainVideoURL="https://res.cloudinary.com/unlimitpotential/video/upload/v1696740681/cut3_scynyq.mp4" width={100} />
        ) : (
          <Player prerollVideoURL="https://res.cloudinary.com/unlimitpotential/video/upload/v1696738639/draft_aw46lh.mp4" mainVideoURL="https://res.cloudinary.com/unlimitpotential/video/upload/v1696740681/cut3_scynyq.mp4" width={100} />
        )}
       
          
          

    </main>
  );
}

/*
progress-width = (currentTime/Duration)*100;
currentTime = (e.target.value * duration )/100;
*/
