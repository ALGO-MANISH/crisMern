import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ZoneMap from './components/ZoneMap';

function Home() {
  const [auth, setAuth] = useState(false);
  const [mlink, setMlink] = useState('');
  const [dname, setdName] = useState('');
  const [message, setMessage] = useState('');
  
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setMlink(res.data.link);
          setdName(res.data.displayname);
        } else {
          setAuth(false);
          setMessage(res.data.Message);         
          navigate('/login');
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, [navigate]);



  return (
    <div>
      {auth ? (
        <div>
          <Header displayName={dname} />
          <ZoneMap maplink={mlink} />
          <Footer />
        </div>
      ) : (
        <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', minHeight: '20vh' }}>
          <h2 style={{ marginTop: "10vh" }}> {message}</h2>        
        </div>
      )}
    </div>
  );
}

export default Home;
