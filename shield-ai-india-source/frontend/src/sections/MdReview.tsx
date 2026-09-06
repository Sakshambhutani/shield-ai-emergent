import { WEEKLY_REVIEWS } from '@/data/md-reviews';

export default function MdReview() {
  const review = WEEKLY_REVIEWS[0];
  return <section aria-label="Deal movement">
    <div className="md-section-title"><h2>Deal movement</h2><span>Illustrative · {review.period}</span></div>
    <div className="md-table-wrap panel"><table className="md-deals">
      <thead><tr>{['Programme', 'Coverage', 'Movement', 'Next gate / blocker'].map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
      <tbody>{review.movements.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map((value, i) => <td key={i}>{value}</td>)}</tr>)}</tbody>
    </table></div>
  </section>;
}
