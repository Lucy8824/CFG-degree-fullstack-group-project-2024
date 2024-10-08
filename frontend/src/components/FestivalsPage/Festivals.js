import React, { useState, useEffect } from "react";
import FestivalCard from "../FestivalsCard/FestivalCard";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "../SearchBox.css";
import "../Banner.css";
// import { fetchFestivals } from "../services/ticketmaster"; Not deleting in case I need it again later
// Would also need to import Profile, Chats and Logout?

async function fetchFestivals(userId) {
  try {
    const response = await fetch(
      `http://localhost:3006/api/festivals/user/${userId}?page=0`
    );
    const data = await response.json();
    return data._embedded?.events || [];
  } catch (error) {
    console.error("Error fetching festivals: ", error);
    return [];
  }
}

const Festivals = () => {
  const { user_id: userId } = useParams();
  const [festivals, setFestivals] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // state to handle search input

  useEffect(() => {
    if (userId) {
      const getFestivals = async () => {
        const fetchedFestivals = await fetchFestivals(userId);
        console.log(fetchedFestivals);
        // Filter only music events
        const musicFestivals = fetchedFestivals.filter((event) =>
          event.classifications.some(
            (classification) => classification.segment.name === "Music"
          )
        );
        setFestivals(musicFestivals);
      };

      getFestivals();
    }
  }, [userId]); // Dependency array includes userId

  // Filter festivals based on search query
  const filteredFestivals = festivals.filter(
    (festival) =>
      festival.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      festival._embedded?.venues[0]?.city.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <NavBar userId={userId} />
      <div className="overlay"></div>
      <div className="banner">
        <h1>Where will you dance next?</h1>
        <div className="search__container">
          <input
            className="search__input"
            type="text"
            placeholder="Search Festivals by Name or Location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <Container fluid="md">
        <Row className="mt-4 justify-content-center">
          {filteredFestivals.length > 0 ? (
            filteredFestivals.map((festival) => (
              <Col
                key={festival.id}
                sm={12}
                md={6}
                lg={3}
                className="mb-4 d-flex"
              >
                <FestivalCard
                  poster={festival.images[0]?.url}
                  name={festival.name}
                  dates={festival.dates.start.localDate}
                  location={
                    festival._embedded.venues[0]?.city.name || "Unknown"
                  }
                  link={`/festival/${festival.id}`} // Dynamic link to the festival details page
                />
              </Col>
            ))
          ) : (
            <p>No festivals found for your search</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Festivals;
