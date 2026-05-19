export default function Home() {
  const stats = [
    { label: 'Issues Reported', value: '1,245' },
    { label: 'Resolved This Month', value: '932' },
    { label: 'Average Resolution Time', value: '2.4 days' },
  ];

  const workflows = [
    {
      title: 'Report an Issue',
      description:
        'Submit photos, location details, and notes for potholes, waste, streetlights, and more.',
    },
    {
      title: 'Track Live Status',
      description:
        'Follow every update from submission to assignment, field action, and resolution proof.',
    },
    {
      title: 'Collaborate Locally',
      description:
        'Support existing reports in your neighborhood to help departments prioritize impact.',
    },
  ];

  const categories = ['Road Damage', 'Garbage Overflow', 'Water Leakage', 'Streetlight Fault', 'Drainage Blockage'];

  return (
    <main className="mx-auto min-h-screen max-w-5xl space-y-10 p-6">
      <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">CivicSolve</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-600">
          AI-powered civic issue reporting that helps residents and local bodies close problems faster.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {workflows.map((item) => (
          <article key={item.title} className="rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold">Popular Categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700"
            >
              {category}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
