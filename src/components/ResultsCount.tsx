type ResultsCountProps = {
  resultCount: number;
};

export default function ResultsCount({ resultCount }: ResultsCountProps) {
  return <p className="count">{resultCount} results</p>;
}
