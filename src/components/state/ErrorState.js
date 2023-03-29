export default function ErrorState({ error, refreshPage }) {
  return (
    <div className="query-container">
      <h2>Error!</h2>
      <p>There was an error processing your request:</p>
      <pre className="query-pre">{JSON.stringify(error.message)}</pre>
      <button className="query-button" onClick={refreshPage}>
        Click to reload
      </button>
      <img
        src="https://www.kindpng.com/picc/m/164-1646889_error-png-page-something-went-wrong-png-transparent.png"
        alt="Error Png Page - Something Went Wrong Png, Transparent"
        style={{ width: "100%", maxWidth: "400px", marginBottom: "20px" }} // Optional: Add some basic styling for the image
      />
    </div>
  );
}
