export default function ResultStats({ moviesLength }) {
  return (
    <p className="num-results">
      Found <strong>{moviesLength}</strong> results
    </p>
  );
}
