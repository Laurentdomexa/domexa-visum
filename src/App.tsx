
import { useState } from "react";

const NAV_LINKS = ["Le service", "Tarifs", "FAQ", "Contact"];

const LOTS_EXAMPLES = [
  { lots: 20, price: 120 },
  { lots: 30, price: 140 },
  { lots: 40, price: 160 },
  { lots: 50, price: 180 },
  { lots: 60, price: 200 },
  { lots: 80, price: 240 },
  { lots: 100, price: 280 },
];

const PACKS = [
  { freq: "2 visites / an", remise: "-10 %", exemple: "288 € / an", color: "bg-blue-50 border-blue-200" },
  { freq: "4 visites / an", remise: "-15 %", exemple: "544 € / an", color: "bg-blue-100 border-blue-300" },
];

const STEPS = [
  {
    num: "1",
    title: "Vous nous contactez",
    desc: "Indiquez-nous l'adresse de l'immeuble et le nombre de lots. Nous vous envoyons un devis très rapidement.",
    icon: "📩",
  },
  {
    num: "2",
    title: "Nous intervenons sur le terrain",
    desc: "Nous prenons contact avec le conseil syndical si nécessaire et réalisons la visite selon vos consignes.",
    icon: "🏢",
  },
  {
    num: "3",
    title: "Vous recevez le rapport",
    desc: "Rapport PDF complet avec photos sous 72h. Prêt à être transmis ou archivé.",
    icon: "📋",
  },
];

const ZONES = [
  "Hall d'entrée et boîtes aux lettres",
  "Escaliers, paliers et couloirs",
  "Caves et locaux techniques",
  "Toiture-terrasse et étanchéité",
  "Équipements de sécurité",
  "Espaces verts et parkings",
  "Points signalés par le conseil syndical",
];

const REASSURANCES = [
  { icon: "🔒", title: "RC Professionnelle souscrite", desc: "Chaque intervention est couverte. Vous déléguez en toute sérénité." },
  { icon: "📋", title: "Rapport professionnel", desc: "Transmissible directement au CS ou présentable en AG sans modification." },
  { icon: "⏱️", title: "Livraison sous 72h", desc: "Parce que votre temps ne peut pas attendre." },
  { icon: "📍", title: "Spécialiste Île-de-France", desc: "75, 92, 93, 94, 78, 91, 95, 77 — toute l'IDF couverte." },
  { icon: "🤝", title: "Sans engagement", desc: "Testez sur un immeuble. Si le rapport ne vous convient pas, vous ne payez pas." },
  { icon: "⚡", title: "Devis rapide", desc: "Envoyez une adresse et un nombre de lots, recevez votre devis très rapidement." },
];

const FAQS = [
  {
    q: "Puis-je vous mandater sans en informer le conseil syndical ?",
    a: "Oui. Nous pouvons intervenir sur instruction du syndic uniquement. Si vous souhaitez que nous rencontrions le président du CS, c'est aussi possible.",
  },
  {
    q: "Le rapport a-t-il une valeur légale ?",
    a: "Il constitue une preuve datée et documentée de l'état des parties communes, utilisable en cas de litige ou pour justifier des travaux en AG.",
  },
  {
    q: "Intervenez-vous sur tout type d'immeuble ?",
    a: "Oui : résidentiel classique, immeuble avec ascenseur, copropriété avec parking ou espaces verts. Contactez-nous pour les cas particuliers.",
  },
  {
    q: "Quel délai pour planifier une visite ?",
    a: "En général sous 5 à 7 jours ouvrés. Des interventions urgentes sont possibles selon disponibilités et font l'objet d'une majoration tarifaire pour tenir compte du caractère prioritaire de l'intervention.",
  },
  {
    q: "Puis-je vous confier plusieurs immeubles en même temps ?",
    a: "Absolument. Des forfaits annuels par portefeuille sont disponibles sur devis.",
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ nom: "", cabinet: "", email: "", tel: "", immeubles: "" });
  const [sent, setSent] = useState(false);
  const [customLots, setCustomLots] = useState(40);
  const [customCages, setCustomCages] = useState(1);
  const cageSupplement = Math.max(0, customCages - 1) * 25;
  const calculatedPrice = 80 + customLots * 2 + cageSupplement;

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/sendmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSent(true);
    } else {
      alert("Erreur lors de l'envoi. Merci de réessayer.");
    }
  } catch (err) {
    alert("Impossible de contacter le serveur. Réessayez plus tard.");
  }
};


  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans text-slate-800 bg-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">DV</span>
            </div>
            <span className="font-bold text-blue-900 text-lg tracking-tight">Domexa Visum</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {["service", "tarifs", "faq", "contact"].map((id, i) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-slate-600 hover:text-blue-900 text-sm font-medium transition-colors"
              >
                {NAV_LINKS[i]}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("contact")}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
          >
            Demander un devis
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-blue-800 bg-opacity-50 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
            Île-de-France · Syndics professionnels
          </div>
          <h1 className="text-5xl font-extrabold leading-tight mb-3">
            Vos visites d'immeubles.
          </h1>
          <p className="text-3xl font-bold text-blue-300 mb-6 tracking-wide">
            Faites. Documentées. Livrées.
          </p>
          <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            Vous gérez des copropriétés en Île-de-France. Vous n'avez pas le temps d'être partout. Nous, si.
          </p>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Nous intervenons à votre place sur le terrain, rédigeons le rapport complet avec photos, et vous le livrons sous 72h.
            Vous restez conforme. Vos copropriétaires sont rassurés. Vous récupérez du temps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("contact")}
              className="bg-blue-400 hover:bg-blue-300 text-blue-900 font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
            >
              📩 Demander un devis gratuit
            </button>
            <button
              onClick={() => scrollTo("service")}
              className="border border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-10 font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Découvrir le service
            </button>
          </div>
          <p className="text-slate-400 text-sm mt-6">Sans engagement · Réponse rapide garantie · RC Pro souscrite</p>
        </div>
      </section>

      {/* PROBLÈME */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Vous reconnaissez-vous ?</h2>
          <p className="text-center text-slate-500 mb-10">La réalité de la plupart des gestionnaires en IDF</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Vous avez signé des visites dans vos contrats syndic… mais vous n'avez pas eu le temps de les faire",
              "Entre les AG, les sinistres et la gestion quotidienne, le terrain passe toujours après",
              "Vous savez qu'en cas de sinistre non détecté, c'est votre responsabilité qui est engagée",
              "Vos copropriétaires réclament des comptes-rendus que vous n'avez pas encore rédigés",
            ].map((text, i) => (
              <div key={i} className="flex gap-3 bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                <span className="text-red-400 text-xl mt-0.5 shrink-0">✗</span>
                <p className="text-slate-700">{text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 bg-blue-900 text-white rounded-2xl p-6 shadow-lg">
            <p className="text-xl font-semibold">Si vous vous reconnaissez dans l'une de ces situations,</p>
            <p className="text-blue-200 mt-1">vous êtes exactement au bon endroit.</p>
          </div>
        </div>
      </section>

      {/* SERVICE */}
      <section id="service" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Ce que nous faisons pour vous</h2>
          <p className="text-center text-slate-500 mb-14">Une visite complète, un rapport professionnel, zéro effort de votre côté</p>

          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">🏢 La visite terrain</h3>
              <p className="text-slate-600 mb-4">Nous contrôlons méthodiquement chaque espace de vos parties communes :</p>
              <ul className="space-y-2">
                {ZONES.map((z, i) => (
                  <li key={i} className="flex gap-2 text-slate-700">
                    <span className="text-blue-500 font-bold mt-0.5">✓</span>
                    {z}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">📋 Le rapport livré sous 72h</h3>
              <p className="text-slate-600 mb-4">Vous recevez par email un document PDF structuré comprenant :</p>
              <ul className="space-y-2">
                {[
                  "Photos légendées de chaque zone visitée",
                  "État de chaque équipement (bon / à surveiller / urgent)",
                  "Recommandations claires et hiérarchisées",
                  "Document daté et signé",
                  "Utilisable en AG et pour votre dossier de responsabilité",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 text-slate-700">
                    <span className="text-blue-500 font-bold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-blue-900 font-semibold text-sm">Rien à faire de votre côté.</p>
                <p className="text-blue-700 text-sm">Vous recevez. Vous transmettez.</p>
              </div>
            </div>
          </div>

          {/* ÉTAPES */}
          <h3 className="text-2xl font-bold text-center text-slate-900 mb-10">En 3 étapes simples</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="text-center bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h4 className="font-bold text-slate-900 mb-2">{step.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <section id="tarifs" className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Tarifs clairs, sans surprise</h2>
          <p className="text-center text-slate-400 mb-12">Déplacement · Visite · Photos · Rapport PDF · Livraison 72h — tout compris</p>

          {/* Formule */}
          <div className="bg-blue-900 rounded-2xl p-8 text-center mb-10 border border-blue-700">
            <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-2">Formule unique</p>
            <div className="text-5xl font-extrabold text-white mb-3">
              80 € <span className="text-blue-300 text-3xl">+ 2 € / lot</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-blue-800 border border-blue-600 rounded-xl px-5 py-2 mt-1">
              <span className="text-blue-300 text-lg">🪜</span>
              <span className="text-white font-semibold text-sm">+ 25 € par cage d'escalier supplémentaire</span>
            </div>
            <p className="text-slate-400 mt-3 text-sm">La 1ère cage est incluse. Pas de frais cachés. Pas de surprises.</p>
          </div>

          {/* Calculateur */}
          <div className="bg-slate-800 rounded-2xl p-6 mb-10 border border-slate-700">
            <h3 className="text-lg font-bold text-center mb-6">🧮 Calculez votre tarif</h3>
            <div className="flex flex-col items-center gap-5">
              <div className="flex items-center gap-4 flex-wrap justify-center w-full">
                <label className="text-slate-300 text-sm w-36 text-right">Nombre de lots :</label>
                <input
                  type="range"
                  min={5}
                  max={150}
                  value={customLots}
                  onChange={(e) => setCustomLots(Number(e.target.value))}
                  className="w-40 accent-blue-400"
                />
                <input
                  type="number"
                  min={5}
                  max={500}
                  value={customLots}
                  onChange={(e) => setCustomLots(Math.max(5, Number(e.target.value)))}
                  className="w-20 bg-slate-700 border border-slate-500 rounded-lg px-3 py-1 text-white text-center font-bold focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="flex items-center gap-4 flex-wrap justify-center w-full">
                <label className="text-slate-300 text-sm w-36 text-right">Cages d'escalier :</label>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={customCages}
                  onChange={(e) => setCustomCages(Number(e.target.value))}
                  className="w-40 accent-blue-400"
                />
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={customCages}
                  onChange={(e) => setCustomCages(Math.max(1, Number(e.target.value)))}
                  className="w-20 bg-slate-700 border border-slate-500 rounded-lg px-3 py-1 text-white text-center font-bold focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="text-center bg-slate-700 rounded-xl p-4 w-full">
                <p className="text-slate-400 text-sm mb-2">Prix pour votre visite</p>
                <p className="text-5xl font-extrabold text-blue-300">{calculatedPrice} €</p>
                <p className="text-slate-500 text-xs mt-2">
                  = 80 € base + {customLots} lots × 2 €
                  {customCages > 1 ? ` + ${customCages - 1} cage${customCages > 2 ? "s" : ""} suppl. × 25 €` : ""}
                </p>
                {customCages > 1 && (
                  <p className="text-blue-400 text-xs mt-1">dont {cageSupplement} € de supplément multi-cages</p>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-slate-800 rounded-2xl overflow-hidden mb-10 border border-slate-700">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700">
                  <th className="py-3 px-6 text-left text-slate-300 text-sm font-semibold">Taille immeuble</th>
                  <th className="py-3 px-6 text-right text-slate-300 text-sm font-semibold">Prix total TTC</th>
                </tr>
              </thead>
              <tbody>
                {LOTS_EXAMPLES.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-slate-800" : "bg-slate-750"}>
                    <td className="py-3 px-6 text-slate-300">{row.lots} lots</td>
                    <td className="py-3 px-6 text-right font-bold text-white">{row.price} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Packs */}
          <h3 className="text-xl font-bold text-center mb-6">📦 Packs annuels</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {PACKS.map((pack, i) => (
              <div key={i} className="bg-slate-800 rounded-xl p-6 border border-slate-600 text-center">
                <p className="font-bold text-white text-lg mb-1">{pack.freq}</p>
                <p className="text-blue-300 text-2xl font-extrabold">{pack.remise}</p>
                <p className="text-slate-400 text-sm mt-1">Exemple 40 lots : {pack.exemple}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-sm">Zone : Paris et toute l'Île-de-France (75, 92, 93, 94, 78, 91, 95, 77)</p>

          <div className="text-center mt-8">
            <button
              onClick={() => scrollTo("contact")}
              className="bg-blue-400 hover:bg-blue-300 text-blue-900 font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              📩 Demander un devis gratuit
            </button>
          </div>
        </div>
      </section>

      {/* RÉASSURANCE */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Pourquoi nous faire confiance ?</h2>
          <p className="text-center text-slate-500 mb-12">Les engagements qui font la différence</p>
          <div className="grid md:grid-cols-3 gap-6">
            {REASSURANCES.map((r, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="text-3xl mb-3">{r.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{r.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Questions fréquentes</h2>
          <p className="text-center text-slate-500 mb-12">Tout ce que vous devez savoir avant de commencer</p>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-slate-900">{faq.q}</span>
                  <span className="text-blue-900 font-bold text-xl ml-4 shrink-0">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 bg-blue-900 text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Prêt à récupérer du temps ?</h2>
          <p className="text-center text-blue-200 mb-10">Envoyez-nous votre demande. Nous vous répondrons très rapidement.</p>

          {sent ? (
            <div className="bg-blue-800 rounded-2xl p-10 text-center border border-blue-600">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-2">Demande envoyée !</h3>
              <p className="text-blue-200">Je vous recontacte dans les 2 heures avec votre devis.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-blue-800 rounded-2xl p-8 border border-blue-700 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-blue-200 text-sm font-medium block mb-1">Prénom / Nom *</label>
                  <input
                    required
                    type="text"
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    className="w-full bg-blue-900 border border-blue-600 rounded-lg px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-blue-300"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label className="text-blue-200 text-sm font-medium block mb-1">Cabinet syndic *</label>
                  <input
                    required
                    type="text"
                    value={form.cabinet}
                    onChange={(e) => setForm({ ...form, cabinet: e.target.value })}
                    className="w-full bg-blue-900 border border-blue-600 rounded-lg px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-blue-300"
                    placeholder="Cabinet Immobilier XYZ"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-blue-200 text-sm font-medium block mb-1">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-blue-900 border border-blue-600 rounded-lg px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-blue-300"
                    placeholder="jean@cabinet.fr"
                  />
                </div>
                <div>
                  <label className="text-blue-200 text-sm font-medium block mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={form.tel}
                    onChange={(e) => setForm({ ...form, tel: e.target.value })}
                    className="w-full bg-blue-900 border border-blue-600 rounded-lg px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-blue-300"
                    placeholder="06 XX XX XX XX"
                  />
              </div>

<div>
  <label className="text-blue-200 text-sm font-medium block mb-1">
    Joindre un fichier (PDF, Excel, photos…)
  </label>

  <input
    type="file"
    onChange={(e) => setForm({ ...form, file: e.target.files?.[0] })}
    className="w-full bg-blue-900 border border-blue-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-300"
  />

  <p className="text-blue-400 text-xs mt-1">
    Formats acceptés : PDF, Excel, Word, JPG, PNG (max 10 Mo)
  </p>
</div>   

<button
  type="submit"
  className="w-full bg-blue-400 hover:bg-blue-300 text-blue-900 font-bold py-4 rounded-xl text-lg transition-colors mt-2"
>
  Envoyer ma demande de devis →
</button>

<p className="text-blue-400 text-xs text-center">
  Sans engagement · Réponse rapide garantie · RC Pro souscrite
</p>
</form>


          )}

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10 text-center">
            <div>
              <p className="text-blue-300 text-xs uppercase tracking-wide mb-1">Email</p>
              <a href="mailto:contact@domexavisum.fr" className="text-white font-semibold hover:text-blue-300 transition-colors">contact@domexavisum.fr</a>
            </div>
            <div>
              <p className="text-blue-300 text-xs uppercase tracking-wide mb-1">Téléphone</p>
              <a href="tel:+33695490205" className="text-white font-semibold hover:text-blue-300 transition-colors">06 95 49 02 05</a>
            </div>
            <div>
              <p className="text-blue-300 text-xs uppercase tracking-wide mb-1">LinkedIn</p>
              <a href="https://www.linkedin.com/in/laurent-d-298a103a7" target="_blank" className="text-white font-semibold hover:text-blue-300 transition-colors">Domexa Visum</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-500 py-8 px-6 text-center text-sm">
        <p className="font-semibold text-slate-300 mb-1">Domexa Visum — Lead Up SAS</p>
        <p className="mb-1">SIRET 94904830000014 · RC Professionnelle souscrite · Île-de-France</p>
        <p>contact@domexavisum.com · 06 95 49 02 05</p>
        <p className="mt-3 text-slate-600">© 2026 — Tous droits réservés · Mentions légales</p>
      </footer>
    </div>
  );
}
