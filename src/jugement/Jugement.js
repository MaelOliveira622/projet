import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faHome, faUser, faBookmark, faCheckCircle, faTimesCircle, faCheck, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons'; 
import pp from '../images/pp.jpg';

import './Jugement.css';

function Jugement() {
  const [tweets, setTweets] = useState([]);
  const [filters, setFilters] = useState({
    option1: true,
    option2: true,
  });
  const loggedInUsername = 'LennyB';

  const handleFilterChange = (option) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [option]: !prevFilters[option]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  useEffect(() => {
    async function fetchFeed() {
      try {
        const response = await fetch('http://localhost:3000/feed', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tweets');
        }
        const data = await response.json();
        // Récupérer les tweets
        const filteredTweets = data.posts.filter((post) => post.status === 'En_attente');
        const tweetsWithUserInfo = await Promise.all(filteredTweets.map(async (tweet) => {
          const userResponse = await fetch(`http://localhost:3000/user/${tweet.utilisateur_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await userResponse.json();
          return {
            ...tweet,
            userFullName: `${userData.prenom} ${userData.nom}`,
            userUsername: `${userData.prenom}${userData.nom}`,
            userProfilePic: userData.profilePic,
            status: 'En_attente', // Ajout de l'état de la publication
          };
        }));
        setTweets(tweetsWithUserInfo);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    }
  
    fetchFeed();
  }, []);

  const handleAccept = async (tweetId) => {
    try {
      const response = await fetch('http://localhost:3000/ressourceUpdate', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: tweetId,
          statu: 'Actif',
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to accept tweet');
      }
      // Mettre à jour localement l'état du tweet
      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet.id === tweetId ? { ...tweet, status: 'Actif' } : tweet
        )
      );
    } catch (error) {
      console.error('Error accepting tweet:', error);
    }
  };
  
  const handleReject = async (tweetId) => {
    try {
      const response = await fetch('http://localhost:3000/ressourceUpdate', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: tweetId,
          statu: 'Refus_',
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to reject tweet');
      }
      // Mettre à jour localement l'état du tweet
      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet.id === tweetId ? { ...tweet, status: 'Refus_' } : tweet
        )
      );
    } catch (error) {
      console.error('Error rejecting tweet:', error);
    }
  };  

  return(
    <div className="Favoris">
      <div className="gear-icon"onClick={() => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('active');
      }}>
        <FontAwesomeIcon icon={faCog} />
      </div>
      <div className="sidebar">
        <div className="gear-icon"onClick={() => {
          const sidebar = document.querySelector('.sidebar');
          sidebar.classList.toggle('active');
        }}>
          <FontAwesomeIcon icon={faCog} />
        </div>
        <div className="search-user">
          <input type="text" placeholder="Rechercher un utilisateur" />
        </div>
        <div className="user-links">
          <Link to="/accueil">
            <FontAwesomeIcon icon={faHome} /> 
            Accueil
          </Link>
          <Link to={`/profile/${loggedInUsername}`}>
            <FontAwesomeIcon icon={faUser} /> 
            Mon Profil
          </Link>
          <Link to="/favoris">
            <FontAwesomeIcon icon={faBookmark} /> 
            Favoris
          </Link>
          <Link to="/jugement">
            <FontAwesomeIcon icon={faCheck} /> 
            Publication
          </Link>
        </div>
        <div className="filter-posts">
        </div>
        <div className="user-links deconnexion">
          <Link to="/" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> 
            Déconnexion
          </Link>
        </div>
      </div>
      
      <div className='title'>
        Ressource à approuver
      </div>
      <div className="profile-tweets">
        {tweets.length > 0 ? (
          tweets.map((tweet) => (
            <div className="tweet" key={tweet.id}>
              <div className="tweet-header">
                <Link to={`/user/${tweet.utilisateur_id}`}>
                  <div className="user-info">
                    <h3>{tweet.userFullName}</h3>
                    <p>@{tweet.userUsername}</p>
                  </div>
                </Link>
              </div>
              <div className="tweet-content">
                <p>{tweet.contenu}</p>
              </div>
              <div className="tweet-actions">
                {tweet.status === 'En_attente' && (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} onClick={() => handleAccept(tweet.id)} className="accept-icon" />
                    <FontAwesomeIcon icon={faTimesCircle} onClick={() => handleReject(tweet.id)} className="reject-icon" />
                  </>
                )}
                {tweet.status === 'Accepté' && <p>Accepté</p>}
                {tweet.status === 'Refusé' && <p>Refusé</p>}
              </div>
            </div>
          ))
        ) : (
          <p>Aucun tweet à afficher pour le moment.</p>
        )}
      </div>
    </div>
  );
}

export default Jugement;
