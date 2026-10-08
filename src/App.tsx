function App() {
  return (
    <main className="min-h-screen bg-white text-black">
      <nav className="flex items-center justify-between p-6">
        <h1 className="text-xl font-bold">
          Illini Creative Impact
        </h1>

        <a href="#about">About Us</a>
      </nav>

      <section className="px-8 py-24 text-center">
        <h2 className="text-5xl font-bold">
          Creativity Meets Impact.
        </h2>

        <p className="mt-6 text-lg">
          A student-led creative community at UIUC.
        </p>
      </section>

      <section id="about" className="p-8">
        <h2 className="text-3xl font-bold">About Us</h2>
      </section>
    </main>
  )
}

export default App