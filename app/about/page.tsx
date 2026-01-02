import Header from '@/components/Header'
import { CONFUSION_LABELS, ENHANCEMENT_LABELS } from '@/lib/types'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <span className="text-6xl mb-4 block">🍺🎬</span>
            <h1 className="font-display text-5xl text-cream mb-4">
              THE BEER RATING SYSTEM
            </h1>
            <p className="text-xl text-smoke">
              Because some movies hit different with a buzz
            </p>
          </div>
          
          {/* Philosophy */}
          <section className="mb-16">
            <h2 className="font-display text-3xl text-beer-gold mb-4">THE PHILOSOPHY</h2>
            <div className="prose prose-invert max-w-none text-smoke space-y-4">
              <p>
                Not all movies are meant to be watched sober. Some require chemical assistance 
                to follow, others become transcendent experiences with the right buzz. 
                Beers Per Film exists to help you make informed drinking decisions.
              </p>
              <p>
                We use a dual-axis rating system because "how many beers" is actually 
                two different questions:
              </p>
            </div>
          </section>
          
          {/* Confusion Beers */}
          <section className="mb-12 bg-bar-dark rounded-xl p-6 border border-neon-blue/30">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🧠</span>
              <h3 className="font-display text-2xl text-neon-blue">CONFUSION BEERS</h3>
            </div>
            <p className="text-smoke mb-6">
              How much mental lubrication do you need to follow the plot? 
              Some movies are intentionally complex, others are just poorly edited. 
              Either way, beer helps.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {Object.entries(CONFUSION_LABELS).map(([num, label]) => (
                <div key={num} className="text-center p-2 bg-bar-gray rounded">
                  <span className="font-display text-2xl text-neon-blue">{num}</span>
                  <p className="text-xs text-smoke mt-1">{label}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Enhancement Beers */}
          <section className="mb-12 bg-bar-dark rounded-xl p-6 border border-beer-gold/30">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🎉</span>
              <h3 className="font-display text-2xl text-beer-gold">ENHANCEMENT BEERS</h3>
            </div>
            <p className="text-smoke mb-6">
              How much better does the movie get with a buzz? 
              Bad movies can become cult classics. Action movies become experiences. 
              This measures the drinking enhancement factor.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {Object.entries(ENHANCEMENT_LABELS).map(([num, label]) => (
                <div key={num} className="text-center p-2 bg-bar-gray rounded">
                  <span className="font-display text-2xl text-beer-gold">{num}</span>
                  <p className="text-xs text-smoke mt-1">{label}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Examples */}
          <section className="mb-16">
            <h2 className="font-display text-3xl text-cream mb-6">RATING EXAMPLES</h2>
            <div className="space-y-4">
              <div className="bg-bar-dark rounded-lg p-4 border border-smoke">
                <h4 className="font-display text-xl text-cream">Primer (2004)</h4>
                <p className="text-smoke text-sm mb-2">🧠 10 / 🎉 4</p>
                <p className="text-smoke">
                  Engineers made a time travel movie for engineers. The plot is so dense 
                  you'll need a flowchart AND beer. But beer alone can't save you.
                </p>
              </div>
              <div className="bg-bar-dark rounded-lg p-4 border border-smoke">
                <h4 className="font-display text-xl text-cream">The Room (2003)</h4>
                <p className="text-smoke text-sm mb-2">🧠 2 / 🎉 10</p>
                <p className="text-smoke">
                  Oh hi Mark. The plot is simple (sort of), but the experience becomes 
                  legendary with friends and drinks. Mandatory intoxication.
                </p>
              </div>
              <div className="bg-bar-dark rounded-lg p-4 border border-smoke">
                <h4 className="font-display text-xl text-cream">Schindler's List (1993)</h4>
                <p className="text-smoke text-sm mb-2">🧠 3 / 🎉 0</p>
                <p className="text-smoke">
                  Some movies deserve your full, sober attention. This is one of them.
                </p>
              </div>
            </div>
          </section>
          
          {/* Disclaimer */}
          <section className="text-center border-t border-smoke pt-8">
            <h3 className="font-display text-xl text-cream mb-4">RESPONSIBLE DRINKING</h3>
            <p className="text-smoke text-sm max-w-xl mx-auto">
              Beers Per Film is for entertainment purposes only. Please drink responsibly. 
              Know your limits. Don't drink and drive. If you're going to watch Primer, 
              maybe stick to one beer so you can at least try to follow along.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
