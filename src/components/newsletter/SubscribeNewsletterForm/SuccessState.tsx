export default function SuccessState() {
  return (
    <div className="sub-news-form-empty frosted-container spinner-container bg-frosted-dark-faded">
      <div className="spinner-overlay">
        {/* success icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 24 24"
          role="img"
        >
          <title>Subscription successful</title>
          <path
            fill="currentColor"
            d="M18 6h2v2h-2zm-2 4V8h2v2zm-2 2v-2h2v2zm-2 2h2v-2h-2zm-2 2h2v-2h-2zm-2 0v2h2v-2zm-2-2h2v2H6zm0 0H4v-2h2z"
          />
        </svg>
      </div>
    </div>
  );
}
