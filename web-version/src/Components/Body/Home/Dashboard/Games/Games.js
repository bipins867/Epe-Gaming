import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tabs, Tab, Table, Spinner } from "react-bootstrap";
import "./Games.css";
import { fetchGameDashboardInfoHandler } from "./apiHandler";
import { useAlert } from "../../../../UI/Alert/AlertContext";

export const GamesPage = () => {

  const [isDataLoading,setIsDataLoading]=useState(false);
  const {showAlert}=useAlert();

  const sliderImages = [
    "/Assets/image/ENGL1.jpg",
    "/Assets/image/ENGL2.jpg",
    "/Assets/image/ENGL3.jpg",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };


  // Sample data for matches and leaderboard
  // Dynamically set the background image
  const BackgroundStyle = {
    backgroundImage:
      'url("/Assets/Dashboard/Category/BattleRoyal/battleRoyal.jpg")', // Replace with your image path
      };

  const [countInfo,setCountInfo]=useState({totalPlayers:0,upcomingMatches:0});

  const [matches,setMatches]=useState([]);

  const [leaderboard,setLeaderboard]=useState([]);




  
  useEffect(()=>{
    const fetchDetails=async()=>{
      const response=await fetchGameDashboardInfoHandler(setIsDataLoading,showAlert);
    
      if(response){

        
        setCountInfo(response.countInfo);
        setMatches(response.upcomingMatches);
        setLeaderboard(response.leaderboardData);
      }
    }

    fetchDetails();

  },[])



  if (isDataLoading) {
    return (
      <>
        {" "}
        <div className="loading-screen text-center">
          <Spinner animation="border" role="status" className="loading-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h4 className="loading-text">Fetching Game Details...</h4>
        </div>
      </>
    );
  }




  return (
    <div className="bgmi-home-page" style={BackgroundStyle}>
      <section className="bgmi-blurred-background">
        {/* BGMI Information Section */}
        <section className="bgmi-info-section">
          <h1 className="bgmi-title">BGMI: BattleGround Mobile India</h1>
          <p className="bgmi-description">
            Battlegrounds Mobile India (BGMI) is a multiplayer online battle
            royale game developed by Krafton. Compete in thrilling matches, show
            your skills, and conquer the battlefield!
          </p>
        </section>

        {/* Blurred Background Effect Section */}

        <Slider {...sliderSettings} className="bgmi-slider-container">
          {sliderImages.map((image, index) => (
            <div key={index} className="bgmi-slider-image-wrapper">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="bgmi-slider-image"
              />
            </div>
          ))}
        </Slider>
      </section>

      {/* Match Stats Section */}
      <section className="bgmi-stats-section">
        <div className="bgmi-stats">
          <div className="bgmi-stats-item">
            <h3>Total Players</h3>
            <p>{countInfo.totalPlayers}+</p>
          </div>
          <div className="bgmi-stats-item">
            <h3>Upcoming Matches</h3>
            <p>{countInfo.upcomingMatches}</p>
          </div>
        </div>
      </section>

      <section className="bgmi-blurred-background">
      {/* Tabs Section */}
      <section className="bgmi-tabs-section">
        <Tabs defaultActiveKey="matches" id="bgmi-tabs">
          <Tab eventKey="matches" title="Upcoming Matches">
            <Table striped bordered hover responsive className="bgmi-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Title</th>
                  <th>Event Type</th>
                  <th>Map</th>
                  <th>Prize Pool</th>
                  <th>Entry Fee</th>
                  <th>Per Kill</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match,index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{new Date(match.startTime).toLocaleDateString()}</td>
                    <td>{new Date(match.startTime).toLocaleTimeString()}</td>
                    <td>{match.tittle}</td>
                    <td>{match.eventType}</td>
                    <td>{match.map}</td>
                    
                    <td>{match.prizePool_1}</td>
                    <td>{match.entryFee}</td>
                    <td>{match.perKill}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="leaderboard" title="Leaderboard">
            <Table striped bordered hover responsive className="bgmi-table">
              <thead>
                <tr>
                
                  <th>Rank</th>
                  <th>Player Id</th>
                  <th>Player Name</th>
                  <th>Kills</th>
                  <th>Score</th>
                  <th>Winning ₹</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player,index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{player.playerId}</td>
                    <td>{player.playerName}</td>
                    <td>{player.totalKills}</td>
                    <td>{player.totalPoints}</td>
                    <td>₹ {player.totalWinning}</td>
                    
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </section>
      </section>
    </div>
  );
};
