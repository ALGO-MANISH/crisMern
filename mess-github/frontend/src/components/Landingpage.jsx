import React, { useState, useEffect } from 'react';

export default function Landingpage(props) {
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    // Fetch the map link asynchronously when the component mounts   
    async function fetchMapLink() {
      try {       
        const mapLink = await fetchMapLinkFromServer(); 
        setIframeSrc(mapLink);
      } catch (error) {
        console.error('Error fetching map link:', error);
      }
    }

    fetchMapLink();
  }, []);


  function fetchMapLinkFromServer() {
    return new Promise((resolve, reject) => {
      try {
        const mapLink = props.maplink;
        resolve(mapLink);
      } catch (error) {
        reject(error);
      }
    });    
  }  

  return (
    <>    
  <div className="iframe-container">
    <p>{props.email}-----{props.role}</p>
   <iframe src="https://picsum.photos/200/300" frameborder="0"></iframe>
  </div>

</>

  );
}
