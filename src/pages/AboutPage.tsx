function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl underline mt-4">How to use this app</h1>
      <h2 className="text-3xl mt-8">Get local weather</h2>
      <p>
        On the <a href="/">home page</a>, simply allow the app to get your
        browser location. On the top left of your screen, you'll see a pop up
        asking to use your location.
      </p>
      <p>
        If you do not wish to accept your request, no problem! Simply go to the
        search page and search for any latitude and longitude in the world.
      </p>
    </main>
  );
}

export default AboutPage;
