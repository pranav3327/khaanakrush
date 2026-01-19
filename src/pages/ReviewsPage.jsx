import './InfoPages.css';

export default function ReviewsPage() {
  const reviews = [
    {
      name: 'Aarav S.',
      title: 'Home gathering',
      quote:
        'The cart setup looked premium and the food came out hot, one after another — exactly what we wanted for guests.'
    },
    {
      name: 'Meera K.',
      title: 'Corporate evening',
      quote:
        'Clean service, consistent taste, and fast handling. It felt like a high-end catering experience without the chaos.'
    },
    {
      name: 'Rohan P.',
      title: 'Birthday celebration',
      quote:
        'Loved the cooked-fresh vibe. The team was calm and the presentation was on point. Guests kept asking about the brand.'
    }
  ];

  return (
    <div className="pagePad">
      <div className="container">
        <div className="pageHeader">
          <div className="kicker">Reviews</div>
          <h1 className="title">Customer Reviews</h1>
          <p className="subtitle">
            A premium experience is measured by consistency. Here’s what customers say about the cooked-fresh cart
            flow, service discipline, and taste.
          </p>
        </div>

        <div className="infoGrid">
          {reviews.map((r) => (
            <article className="card infoCard" key={r.name}>
              <div className="reviewTop">
                <div className="reviewName">{r.name}</div>
                <div className="reviewTitle">{r.title}</div>
              </div>
              <div className="reviewQuote">“{r.quote}”</div>
              <div className="reviewStars" aria-label="5 star rating">
                ★★★★★
              </div>
            </article>
          ))}

          <section className="card infoCard">
            <div className="infoTitle">What customers value most</div>
            <ul className="infoList">
              <li>Hot food served in sequence (not sitting in trays)</li>
              <li>Clean cart layout and visible hygiene</li>
              <li>Premium look-and-feel that fits modern events</li>
              <li>Reliable timing for gatherings and corporate drops</li>
            </ul>
            <div className="infoNote">
              Want to share feedback? You can message us via the Contact page.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

