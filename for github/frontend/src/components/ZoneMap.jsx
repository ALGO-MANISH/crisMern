import React, { useState, useEffect } from 'react';

export default function ZoneMap(props) {
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
    <iframe src={iframeSrc} allowFullScreen />
  </div>
  <style jsx>{`
    .iframe-container {
      position: relative;
      width: 100%;
      padding-top: calc(9.5/21 * 100%); /* 21:9 aspect ratio */
    }

    @media screen and (max-width: 880px) {
      /* For mobile devices */
      .iframe-container {
        padding-top: calc(10/16 * 100%); /* 16:9 aspect ratio */
      }
    }

    /* Adjust iframe size */
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `}</style>
</>

  );
}
