import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Search, X } from "react-bootstrap-icons";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Popular search suggestions
  const popularSearches = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Miami",
    "Haircut",
    "Barber",
    "Manicure",
    "Pedicure",
    "Spa",
    "Facial",
  ];

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5002/api/salons/search/instant?q=${encodeURIComponent(
            searchQuery
          )}&limit=5`
        );

        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Search API error:", response.status);
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/salons?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowResults(false);
      setSearchQuery("");
    }
  };

  // Handle salon click from search results
  const handleSalonClick = (salonId) => {
    navigate(`/reservation/${salonId}`);
    setShowResults(false);
    setSearchQuery("");
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  // Handle popular search click
  const handlePopularSearchClick = (term) => {
    setSearchQuery(term);
    // Trigger search automatically when clicking a popular term
    setTimeout(() => {
      navigate(`/salons?search=${encodeURIComponent(term)}`);
      setShowResults(false);
    }, 100);
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="search-container"
      ref={searchRef}
      style={{ position: "relative", width: "100%" }}
    >
      <Form
        className="d-flex align-items-center"
        onSubmit={handleSearchSubmit}
        style={{ position: "relative" }}
      >
        <div style={{ position: "relative", flex: 1 }}>
          <Form.Control
            type="search"
            placeholder="Search salons, cities, services..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchQuery.trim()) {
                handleSearchSubmit(e);
              }
            }}
            style={{
              paddingRight: "40px",
              borderRadius: "25px",
              border: "2px solid #e0e0e0",
              transition: "all 0.3s",
            }}
          />

          {/* Clear button */}
          {searchQuery && (
            <Button
              variant="link"
              onClick={clearSearch}
              style={{
                position: "absolute",
                right: "45px",
                top: "50%",
                transform: "translateY(-50%)",
                padding: "0",
                minWidth: "auto",
                color: "#666",
                zIndex: 1,
              }}
            >
              <X size={18} />
            </Button>
          )}
        </div>

        <Button
          variant="outline-primary"
          type="submit"
          disabled={!searchQuery.trim()}
          style={{
            marginLeft: "10px",
            borderRadius: "25px",
            padding: "8px 20px",
            minWidth: "auto",
          }}
        >
          <Search />
        </Button>
      </Form>

      {/* Search Results Dropdown */}
      {showResults && (
        <div
          className="search-results-dropdown"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            marginTop: "8px",
            zIndex: 1050,
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {/* Loading State */}
          {isLoading && (
            <div
              className="loading-state"
              style={{ padding: "20px", textAlign: "center" }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p
                className="mt-2 mb-0"
                style={{ color: "#666", fontSize: "14px" }}
              >
                Searching for "{searchQuery}"...
              </p>
            </div>
          )}

          {/* Search Results */}
          {!isLoading &&
            searchQuery.trim().length >= 2 &&
            searchResults.length > 0 && (
              <div className="search-results">
                <div
                  className="results-header"
                  style={{
                    padding: "15px 20px 10px",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h6
                    className="mb-0"
                    style={{ fontWeight: "600", color: "#333" }}
                  >
                    Found {searchResults.length} salon
                    {searchResults.length !== 1 ? "s" : ""}
                  </h6>
                  <small style={{ color: "#666" }}>
                    Press Enter for all results
                  </small>
                </div>

                {searchResults.map((salon) => (
                  <div
                    key={salon.id}
                    className="salon-result-item"
                    onClick={() => handleSalonClick(salon.id)}
                    style={{
                      padding: "12px 20px",
                      borderBottom: "1px solid #f5f5f5",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                    }}
                  >
                    <img
                      src={
                        salon.image_url ||
                        "https://images.unsplash.com/photo-1560066984-138dadb4c035"
                      }
                      alt={salon.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h6
                          className="mb-1"
                          style={{ fontWeight: "600", color: "#333" }}
                        >
                          {salon.name}
                        </h6>
                        <span
                          style={{
                            fontSize: "12px",
                            padding: "3px 8px",
                            borderRadius: "12px",
                            backgroundColor:
                              salon.gender === "man" ? "#e3f2fd" : "#fce4ec",
                            color:
                              salon.gender === "man" ? "#1976d2" : "#c2185b",
                          }}
                        >
                          {salon.gender === "man" ? "Men" : "Women"}
                        </span>
                      </div>
                      <p
                        className="mb-1"
                        style={{ fontSize: "14px", color: "#666" }}
                      >
                        📍 {salon.city}
                      </p>
                      {salon.rating > 0 && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                          }}
                        >
                          <span style={{ color: "#ffc107" }}>
                            {"★".repeat(Math.floor(salon.rating))}
                          </span>
                          <span style={{ color: "#e0e0e0" }}>
                            {"★".repeat(5 - Math.floor(salon.rating))}
                          </span>
                          <span
                            style={{
                              fontSize: "12px",
                              color: "#999",
                              marginLeft: "5px",
                            }}
                          >
                            {salon.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div style={{ color: "#666", fontSize: "12px" }}>→</div>
                  </div>
                ))}

                {/* View All Link */}
                <div
                  className="view-all-results"
                  onClick={() => {
                    navigate(
                      `/salons?search=${encodeURIComponent(searchQuery.trim())}`
                    );
                    setShowResults(false);
                    setSearchQuery("");
                  }}
                  style={{
                    padding: "15px 20px",
                    textAlign: "center",
                    backgroundColor: "#f8f9fa",
                    borderTop: "1px solid #f0f0f0",
                    cursor: "pointer",
                    borderBottomLeftRadius: "14px",
                    borderBottomRightRadius: "14px",
                    fontWeight: "600",
                    color: "#1976d2",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e3f2fd";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }}
                >
                  View all results for "{searchQuery}"
                </div>
              </div>
            )}

          {/* No Results when search query is long enough */}
          {!isLoading &&
            searchQuery.trim().length >= 2 &&
            searchResults.length === 0 && (
              <div
                className="no-results"
                style={{ padding: "25px 20px", textAlign: "center" }}
              >
                <div style={{ fontSize: "40px", marginBottom: "15px" }}>🔍</div>
                <h6
                  style={{
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "8px",
                  }}
                >
                  No salons found for "{searchQuery}"
                </h6>
                <p
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    marginBottom: "20px",
                    maxWidth: "300px",
                    margin: "0 auto 20px",
                  }}
                >
                  Try searching for:
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    justifyContent: "center",
                    marginBottom: "15px",
                  }}
                >
                  {popularSearches.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handlePopularSearchClick(suggestion)}
                      style={{
                        borderRadius: "20px",
                        fontSize: "12px",
                        padding: "5px 15px",
                        borderColor: "#ddd",
                        color: "#555",
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>

                <p
                  style={{
                    color: "#888",
                    fontSize: "12px",
                    marginBottom: "0",
                    marginTop: "15px",
                  }}
                >
                  Or try different keywords
                </p>
              </div>
            )}

          {/* Popular Searches (when search is empty or minimal) */}
          {!isLoading && searchQuery.trim().length < 2 && (
            <div className="popular-searches">
              <div
                className="results-header"
                style={{
                  padding: "15px 20px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <h6
                  className="mb-0"
                  style={{ fontWeight: "600", color: "#333" }}
                >
                  🔥 Popular Searches
                </h6>
              </div>

              {popularSearches.map((term, index) => (
                <div
                  key={index}
                  className="popular-search-item"
                  onClick={() => handlePopularSearchClick(term)}
                  style={{
                    padding: "12px 20px",
                    borderBottom: "1px solid #f5f5f5",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  <span
                    style={{
                      color: "#333",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ color: "#1976d2", fontSize: "18px" }}>
                      •
                    </span>
                    {term}
                  </span>
                  <span style={{ fontSize: "12px", color: "#999" }}>→</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
