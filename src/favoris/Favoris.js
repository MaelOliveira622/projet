import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faHome, faUser, faBookmark, faComment, faHeart, faCheck, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons'; 
import pp from '../images/pp.jpg';

import './Favoris.css';

function Favoris() {
  const { username } = useParams();
  const [tweets, setTweets] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [filters, setFilters] = useState({
    option1: true,
    option2: true,
  });
  const [userInfo, setUserInfo] = useState({
    username: "test",
    fullName: 'test',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et sapien eu nunc fringilla iaculis.',
    userLocation: '',
    profilePic: pp,
    website: 'https://example.com',
    joinDate: 'Joined in January 2022',
    followersCount: 1000,
    followingCount: 500,
    tweetsCount: 2000
  });
  const [showCommentInput, setShowCommentInput] = useState(false);
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

  const handleLikeToggle = (tweetId) => {
    setUserInfo((prevUserInfo) => {
      const updatedTweets = prevUserInfo.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return { ...tweet, isLiked: !tweet.isLiked };
        }
        return tweet;
      });
      return { ...prevUserInfo, tweets: updatedTweets };
    });
  };

  const handleBookmarkToggle = (tweetId) => {
    setUserInfo((prevUserInfo) => {
      const updatedTweets = prevUserInfo.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return { ...tweet, isBookmarked: !tweet.isBookmarked };
        }
        return tweet;
      });
      return { ...prevUserInfo, tweets: updatedTweets };
    });
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
    setUserInfo((prevUserInfo) => {
      const updatedTweets = prevUserInfo.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return { ...tweet, comments: [...tweet.comments, newComment] };
        }
        return tweet;
      });
      return { ...prevUserInfo, tweets: updatedTweets };
    });
    setCommentText('');
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
      <div>
        
      </div>
      <div className="profile-tweets">
      <p>Aucun tweet à afficher pour le moment.</p>

      </div>
    </div>
  );
}

export default Favoris;
