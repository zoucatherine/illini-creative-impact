import alexZhangPortrait from '../assets/officer-portraits/alex-zhang.webp';
import ameliaCarpenterPortrait from '../assets/officer-portraits/amelia-carpenter.webp';
import josephWangPortrait from '../assets/officer-portraits/joseph-wang.webp';
import catherineZouPortrait from '../assets/officer-portraits/catherine-zou.webp';
import leilaZouPortrait from '../assets/officer-portraits/leila-zou.webp';
import jadenChenPortrait from '../assets/officer-portraits/jaden-chen.webp';
import alyanAjaniPortrait from '../assets/officer-portraits/alyan-ajani.webp';
import praiseShimPortrait from '../assets/officer-portraits/praise-shim.webp';
import christinaNasiosPortrait from '../assets/officer-portraits/christina-nasios.webp';
import mayumiCaisipPortrait from '../assets/officer-portraits/mayumi-caisip.webp';

const teams = [
  {
    name: 'Events',
    description: 'Build welcoming gatherings, workshops, and experiences that bring the collective together.',
  },
  {
    name: 'Fundraising',
    description: 'Develop partnerships and campaigns that help creative projects grow sustainably.',
  },
  {
    name: 'Design & Artist Coordination',
    description: 'Support artists and shape the visual direction of our projects and showcases.',
  },
  {
    name: 'Marketing',
    description: 'Share our story, connect with audiences, and make every initiative easy to discover.',
  },
  {
    name: 'Showcase Planning',
    description: 'Turn finished work into memorable showcases that celebrate student creativity.',
  },
];

const officers = [
  {
    branch: 'Executive Leadership',
    role: 'President',
    name: 'Alex Zhang',
    portrait: alexZhangPortrait,
    contacts: [
      ['alexzhang675@gmail.com', 'mailto:alexzhang675@gmail.com'],
      ['alexz10@illinois.edu', 'mailto:alexz10@illinois.edu'],
      ['408-898-8207', 'tel:4088988207'],
    ],
  },
  {
    branch: 'External Relations',
    role: 'VP External',
    name: 'Amelia Carpenter',
    portrait: ameliaCarpenterPortrait,
    contacts: [['acarp@illinois.edu', 'mailto:acarp@illinois.edu']],
  },
  {
    branch: 'External Relations',
    role: 'VP External',
    name: 'Joseph Wang',
    portrait: josephWangPortrait,
    contacts: [['josephwang87654321@gmail.com', 'mailto:josephwang87654321@gmail.com']],
  },
  {
    branch: 'Internal Operations',
    role: 'VP Internal',
    name: 'Catherine Zou',
    portrait: catherineZouPortrait,
    contacts: [
      ['czou@illinois.edu', 'mailto:czou@illinois.edu'],
      ['224-833-0140', 'tel:2248330140'],
    ],
  },
  {
    branch: 'Programming & Events',
    role: 'Events Team Leader',
    name: 'Leila Zou',
    portrait: leilaZouPortrait,
    contacts: [['leilayz2@illinois.edu', 'mailto:leilayz2@illinois.edu']],
  },
  {
    branch: 'Finance & Development',
    role: 'Fundraising Head',
    name: 'Jaden Chen',
    portrait: jadenChenPortrait,
    contacts: [
      ['qchen87@illinois.edu', 'mailto:qchen87@illinois.edu'],
      ['760-812-4548', 'tel:7608124548'],
    ],
  },
  {
    branch: 'Finance & Development',
    role: 'Treasurer',
    name: 'Alyan Ajani',
    portrait: alyanAjaniPortrait,
    contacts: [
      ['alyanaa2@illinois.edu', 'mailto:alyanaa2@illinois.edu'],
      ['312-833-0371', 'tel:3128330371'],
    ],
  },
  {
    branch: 'Creative Direction',
    role: 'Design Head & Artist Coord Leader',
    name: 'Praise Shim',
    portrait: praiseShimPortrait,
    contacts: [['praises2@illinois.edu', 'mailto:praises2@illinois.edu']],
  },
  {
    branch: 'Marketing & Communications',
    role: 'Marketing Team Leader',
    name: 'Christina Nasios',
    portrait: christinaNasiosPortrait,
    contacts: [['cnasi@illinois.edu', 'mailto:cnasi@illinois.edu']],
  },
  {
    branch: 'Marketing & Communications',
    role: 'Showcase Planning Team Leader',
    name: 'Mayumi Caisip',
    portrait: mayumiCaisipPortrait,
    contacts: [['mcaisip2@illinois.edu', 'mailto:mcaisip2@illinois.edu']],
  },
];

function OfficerCard({ officer }) {
  return (
    <article className="rounded-2xl border border-[#131E38]/10 bg-white p-6 shadow-lg shadow-[#131E38]/5">
      <img
        src={officer.portrait}
        alt={`${officer.name}, ${officer.role}`}
        className="mb-5 h-24 w-24 rounded-full border-2 border-illiniOrange/40 object-cover"
      />
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-illiniOrange">{officer.role}</p>
      <h3 className="mt-2 font-editorial text-2xl font-bold text-[#131E38]">{officer.name}</h3>
      <div className="mt-4 flex flex-col gap-2 text-sm">
        {officer.contacts.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="break-words text-illiniOrange transition-colors hover:text-[#131E38]"
          >
            {label}
          </a>
        ))}
      </div>
    </article>
  );
}

export default function AboutPage() {
  const branches = [...new Set(officers.map((officer) => officer.branch))];

  return (
    <div className="bg-[#FDFBF7] text-[#131E38]">
      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-illiniOrange">
              About us
            </p>
            <h1 className="font-editorial text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              About the{' '}
              <span className="box-decoration-clone rounded-sm bg-[#E87722]/35 px-1.5 py-0.5 italic">
                Collective
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-700">
              Illini Art &amp; Business Collective bridges creativity and business strategy through collaborative student projects, workshops, and community events. We create space for artists, strategists, organizers, and curious minds to build meaningful work together.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#131E38]/10 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-illiniOrange">
              How we work
            </p>
            <h2 className="font-editorial text-4xl font-extrabold italic tracking-tight sm:text-5xl">
              Many paths, one <span className="text-illiniOrange">community.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <article key={team.name} className="rounded-2xl border border-[#131E38]/10 bg-white p-7 shadow-lg shadow-[#131E38]/5">
                <div className="mb-6 h-1 w-12 rounded-full bg-illiniOrange" />
                <h3 className="font-editorial text-2xl font-bold">{team.name}</h3>
                <p className="mt-4 leading-7 text-slate-700">{team.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-illiniOrange">
              Meet the officers
            </p>
            <h2 className="font-editorial text-4xl font-extrabold tracking-tight sm:text-5xl">
              The people behind the <span className="italic">work.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Connect with the student leaders helping our creative community learn, collaborate, and grow.
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {branches.map((branch) => (
              <div key={branch}>
                <h3 className="border-b border-[#131E38]/10 pb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#131E38]">
                  {branch}
                </h3>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {officers
                    .filter((officer) => officer.branch === branch)
                    .map((officer) => (
                      <OfficerCard key={`${officer.role}-${officer.name}`} officer={officer} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
