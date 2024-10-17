import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./search.css";

// Hàm chuyển đổi chuỗi có dấu thành không dấu
const removeDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [postSuggestions, setPostSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      fetchSuggestions();
    } else {
      setProductSuggestions([]);
      setPostSuggestions([]);
    }
  }, [debouncedSearchQuery]);

  const fetchSuggestions = async () => {
    try {
      setIsLoading(true);

      // Fetch sản phẩm
      const productResponse = await fetch(
        `http://localhost:3030/v1/products?search=${debouncedSearchQuery}`
      );
      const productData = await productResponse.json();
      //   console.log(productData);

      const filteredProductSuggestions = productData.data.products.filter(
        (product) =>
          removeDiacritics(product.productName.toUpperCase()).includes(
            removeDiacritics(debouncedSearchQuery.toUpperCase())
          )
      );
      setProductSuggestions(filteredProductSuggestions);

      // Fetch bài viết
      const postResponse = await fetch(
        `http://localhost:3030/v1/posts?search=${debouncedSearchQuery}`
      );
      const postData = await postResponse.json();
      const filteredPostSuggestions = postData.data.posts.filter((post) =>
        removeDiacritics(post.title.toUpperCase()).includes(
          removeDiacritics(debouncedSearchQuery.toUpperCase())
        )
      );
      setPostSuggestions(filteredPostSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setProductSuggestions([]);
      setPostSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion, type) => {
    if (type === "product") {
      setSearchQuery(suggestion.productName);
    } else if (type === "post") {
      setSearchQuery(suggestion.title);
    }
    setProductSuggestions([]);
    setPostSuggestions([]);
    setSearchQuery("");
  };

  return (
    <>
      <div className="search-container">
        <center>
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </center>
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {/* {isLoading && <p>Đang tìm kiếm...</p>} */}

        {/* Chỉ hiển thị phần gợi ý nếu có từ khóa tìm kiếm */}
        {debouncedSearchQuery && (
          <div className="suggestions">
            {productSuggestions.length === 0 &&
              postSuggestions.length === 0 &&
              !isLoading && <p>Không có gợi ý nào.</p>}

            {productSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {productSuggestions.map((suggestion) => (
                  <Link
                    to={`/detail-product/${suggestion._id}`}
                    style={{ textDecoration: "none", color: "#83bb3e" }}
                  >
                    <li
                      key={suggestion._id}
                      onClick={() =>
                        handleSuggestionClick(suggestion, "product")
                      }
                    >
                      <img
                        src={suggestion.image}
                        alt={suggestion.productName}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />
                      {suggestion.productName}
                    </li>
                  </Link>
                ))}
              </ul>
            )}

            {postSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {postSuggestions.map((suggestion) => (
                  <Link
                    to={`/detailblog/${suggestion._id}`}
                    style={{ textDecoration: "none", color: "#83bb3e" }}
                  >
                    <li
                      key={suggestion._id}
                      onClick={() => handleSuggestionClick(suggestion, "post")}
                    >
                      <img
                        src={suggestion.image}
                        alt={suggestion.title}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />
                      {suggestion.title}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
