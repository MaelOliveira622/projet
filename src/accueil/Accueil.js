import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPaperPlane, faComment, faUser, faHome, faBookmark, faSignOutAlt, faCheck, faTrash, faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import './Accueil.css';

function Accueil() {
  const [tweetText, setTweetText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [tweets, setTweets] = useState([]);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [filters, setFilters] = useState({
    option1: true,
    option2: true,
  });
  const [theme, setTheme] = useState('light');
  const filtre = [{ value: "test", label: "Test" }, { value: "test2", label: "Test 2" }];

  const loggedInUsername = 'admin'


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
        const filteredTweets = data.posts.filter((post) => post.status === 'Actif');
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
            status: 'Actif', 
          };
        }));
        setTweets(tweetsWithUserInfo);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    }
  
    fetchFeed();
  }, []);

  const getFeed = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token non trouvé');
        return;
      }
  
      const response = await axios.get('http://localhost:3000/feed', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTweets(response.data.posts);
    } catch (error) {
      console.error('Erreur lors de la récupération du feed:', error);
    }
  };
  
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token || typeof token !== 'string') {
      console.error('Problème avec le token');
      return false;
    }
  
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.error('Token invalide');
      return false;
    }
  
    const [header, payload, signature] = tokenParts;
  
    try {
      const decodedPayload = JSON.parse(atob(payload));
      const tokenExpiration = decodedPayload.exp;
      const currentTime = Date.now() / 1000;
      if (currentTime > tokenExpiration) {
        console.error('Le token a expiré');
        return false;
      }
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return false;
    }
  
    return true;
  };
  
  const handleTweetSubmit = async (event) => {
    event.preventDefault();
    if (!isAuthenticated()) {
      console.error('L\'utilisateur n\'est pas authentifié');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/ressource', {
        title: tweetText,
        contenue: tweetText,
        utilisateur: 4,
        visibility: undefined
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        fetchFeed();
        setTweetText('');
      } else {
        console.error('Erreur lors de la création du tweet:', response.data.error);
      }
    } catch (error) {
      console.error('Erreur lors de la création du tweet:', error);
    }
  };
  

  const handleLikeToggle = (tweetId) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === tweetId) {
        return { ...tweet, isLiked: !tweet.isLiked };
      }
      return tweet;
    }));
  };

  const handleBookmarkToggle = (tweetId) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === tweetId) {
        return { ...tweet, isBookmarked: !tweet.isBookmarked };
      }
      return tweet;
    }));
  };

  const handleCommentToggle = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentSubmit = (event, tweetId) => {
    event.preventDefault();
    const newComment = {
      content: commentText,
      user: {
        name: 'Anonymous',
        username: 'anonymous'
      }
    };
    setTweets(tweets.map(tweet => {
      if (tweet.id === tweetId) {
        return { ...tweet, comments: [...tweet.comments, newComment] };
      }
      return tweet;
    }));
    setCommentText('');
  };

  const handleFilterChange = (option) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [option]: !prevFilters[option]
    }));
  };

  const filteredTweets = tweets.filter(tweet => {
    if (filters.option1) {
      return true;
    }
    if (filters.option2) {
      return true;
    }
    return false;
  });

  const handleThemeChange = (selectedOption) => {
    setTheme(selectedOption.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  const fetchFeed = async () => {
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
      // Récupérer les tweets avec le statut 'Actif'
      const filteredTweets = data.posts.filter((post) => post.status === 'Actif');
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
          status: 'Actif', 
        };
      }));
      setTweets(tweetsWithUserInfo);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };
  
  const handleDeleteTweet = async (tweetId) => {
    try {
      const response = await fetch('http://localhost:3000/ressourceUpdate', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: tweetId,
          statu: 'Supprim_',
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to reject tweet');
      }
      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet.id === tweetId ? { ...tweet, status: 'Supprim_' } : tweet
        )
      );
      fetchFeed();
    } catch (error) {
      console.error('Error rejecting tweet:', error);
    }
  };  
  

  return (
    <div className={`Accueil ${theme}`}>
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
      <div className="main-content">
        <div className="tweet-compose tweet-compose-top">
          <form onSubmit={handleTweetSubmit} style={{ display: "flex", alignItems: "center" }}>
            <div className='tweet-info'>
              <input
                className='info'
                type="text"
                value={tweetText}
                onChange={(event) => setTweetText(event.target.value)}
                placeholder="Quoi de neuf ?"
              />
            </div>
            <div className='tweet-foot'>
              <button type="submit" className='send-tweet'>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </form>
        </div>
  
        {tweets.length > 0 && filteredTweets.map((tweet) => (
          <div className="tweet" key={tweet.id}>
            <div className="tweet-header">
              <Link to={`/profile/${tweet.userUsername}`}>
                <div className="user-info">
                  <h3>{tweet.userFullName}</h3>
                  <p>@{tweet.userUsername}</p>
                </div>
              </Link>
              <div onClick={() => handleDeleteTweet(tweet.id)} className='trash'>
                <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
              </div>
            </div>
            <div className="tweet-content">
              <p>{tweet.contenu}</p>
            </div>
            <div className="tweet-footer">
              <div>
                <FontAwesomeIcon icon={faComment} onClick={handleCommentToggle} />
              </div>
              <div>
                <FontAwesomeIcon icon={faBookmark} style={{ color: tweet.isBookmarked ? 'black' : 'grey' }} onClick={() => handleBookmarkToggle(tweet.id)} />
              </div>
              <div onClick={() => handleLikeToggle(tweet.id)}>
                <FontAwesomeIcon icon={faHeart} style={{ color: tweet.isLiked ? 'red' : 'black' }} />
              </div>
            </div>
            {showCommentInput && (
              <form onSubmit={(event) => handleCommentSubmit(event, tweet.id)}>
                <input
                  type="text"
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                  placeholder="Votre commentaire..."
                />
                <button type="submit">Commenter</button>
              </form>
            )}
            <div className="comments">
              {tweet.comments && tweet.comments.map((comment, index) => (
                <div className="comment" key={index}>
                  <span>{comment.user.name}</span>: {comment.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const handleSidebarClick = () => {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('active');
};

export default Accueil;
