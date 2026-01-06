import { useLocation } from "react-router-dom";

function Carte() {
  const query = new URLSearchParams(useLocation().search);
  const category = query.get("category");

  return (
    <div style={{ padding: "80px", textAlign: "center" }}>
      <h1>{category?.toUpperCase()} COLLECTION</h1>
      <p>Products will be displayed here</p>
    </div>
  );
}

export default Carte;
