'use client'

import { useState } from 'react'
import {
  BarChart3,
  Bell,
  ChevronRight,
  Crosshair,
  Gamepad2,
  Gauge,
  LayoutGrid,
  LogOut,
  Map,
  Menu,
  MessageSquare,
  Monitor,
  Plus,
  Radio,
  Shield,
  Swords,
  Trophy,
  Users,
  Vote,
  X,
  Zap,
} from 'lucide-react'

type View = 'arena' | 'teams' | 'vote' | 'stats'

const teams = [
  { name: 'FAZE CLAN', tag: 'FAZE', players: 4, color: 'cyan', captain: 'KSCERATO', win: '82%' },
  { name: 'FURIA', tag: 'FURIA', players: 3, color: 'violet', captain: 'yuurih', win: '76%' },
  { name: 'LOUD ESPORTS', tag: 'LOUD', players: 2, color: 'blue', captain: 'chelo', win: '68%' },
  { name: 'MIBR', tag: 'MIBR', players: 5, color: 'amber', captain: 'arT', win: '61%' },
]

const stats = [
  ['KSCERATO', 'FAZE CLAN', '23', '15', '1.53'],
  ['yuurih', 'FAZE CLAN', '18', '16', '1.13'],
  ['chelo', 'LOUD ESPORTS', '15', '17', '0.88'],
  ['arT', 'MIBR', '12', '21', '0.57'],
]

const votes = [
  { label: 'Mirage Exclusive', type: 'MAPA', votes: 18, tone: 'blue', art: 'bg-grid' },
  { label: 'Dust 1.6', type: 'MAPA', votes: 12, tone: 'violet', art: 'bg-dust' },
  { label: 'Clock Tower', type: 'MAPA', votes: 9, tone: 'cyan', art: 'bg-clock' },
]

function Brand() {
  return (
    <div className="brand" aria-label="Aldeia Arena">
      <div className="brand-mark"><Swords size={17} /></div>
      <div><strong>ALDEIA</strong><span>ARENA</span></div>
    </div>
  )
}

export default function Page() {
  const [active, setActive] = useState<View>('arena')
  const [mobileNav, setMobileNav] = useState(false)
  const [joined, setJoined] = useState<string | null>(null)
  const navItems = [
    { id: 'arena' as View, label: 'Visão geral', icon: LayoutGrid },
    { id: 'teams' as View, label: 'Times', icon: Users },
    { id: 'vote' as View, label: 'Votação', icon: Vote },
    { id: 'stats' as View, label: 'Estatísticas', icon: BarChart3 },
  ]

  return (
    <main className="shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
        <div className="sidebar-top"><Brand /><button className="icon-button mobile-close" onClick={() => setMobileNav(false)} aria-label="Fechar menu"><X /></button></div>
        <div className="server-status"><span className="status-dot" /> <span>Servidor online</span><b>37ms</b></div>
        <nav aria-label="Navegação principal">
          <p className="eyebrow">CENTRAL DA ARENA</p>
          <div className="nav-list">{navItems.map(({ id, label, icon: Icon }) => <button key={id} className={`nav-item ${active === id ? 'active' : ''}`} onClick={() => { setActive(id); setMobileNav(false) }}><Icon /><span>{label}</span>{active === id && <ChevronRight className="nav-arrow" />}</button>)}</div>
        </nav>
        <div className="sidebar-bottom">
          <div className="profile"><div className="avatar">LC</div><div><strong>Locutor</strong><span>Capitão · nível 42</span></div><button className="more-button" aria-label="Abrir opções">•••</button></div>
          <button className="nav-item logout"><LogOut /><span>Sair da arena</span></button>
        </div>
      </aside>
      {mobileNav && <button className="backdrop" onClick={() => setMobileNav(false)} aria-label="Fechar navegação" />}
      <section className="content">
        <header className="topbar"><button className="icon-button menu-trigger" onClick={() => setMobileNav(true)} aria-label="Abrir menu"><Menu /></button><div className="breadcrumb"><span>ALDEIA ARENA</span><ChevronRight size={14} /><b>{navItems.find((item) => item.id === active)?.label}</b></div><div className="top-actions"><button className="icon-button" aria-label="Notificações"><Bell /><i /></button><div className="live-chip"><span /> AO VIVO</div></div></header>
        <div className="page-heading"><div><p className="eyebrow blue">SEASON 04 <span>•</span> MATCHMAKING</p><h1>{active === 'arena' ? 'Pronto para dominar?' : navItems.find((item) => item.id === active)?.label}</h1><p className="subtitle">Organize seu time, encontre uma partida e deixe sua marca na arena.</p></div><div className="heading-actions"><button className="outline-button"><Monitor /> Ver espectador</button><button className="primary-button"><Zap /> Entrar na fila</button></div></div>

        {active === 'arena' && <ArenaHome onView={setActive} />}
        {active === 'teams' && <Teams joined={joined} onJoin={setJoined} />}
        {active === 'vote' && <VoteView />}
        {active === 'stats' && <Stats />}
      </section>
    </main>
  )
}

function ArenaHome({ onView }: { onView: (view: View) => void }) {
  return <div className="dashboard-grid">
    <section className="hero-card panel-glow"><div className="hero-copy"><div className="live-label"><span /> PARTIDA EM ANDAMENTO</div><h2>Domine o mapa.<br /><em>Escreva a história.</em></h2><p>Há uma disputa acontecendo agora. Entre na fila para encontrar seu próximo desafio.</p><button className="primary-button large" onClick={() => onView('teams')}>Encontrar partida <ChevronRight /></button></div><div className="hero-visual"><div className="crosshair"><Crosshair /></div><div className="ring ring-one" /><div className="ring ring-two" /><div className="match-label"><span>ROUND 08</span><b>FAZE <i>VS</i> MIBR</b></div></div></section>
    <section className="panel queue-card"><div className="section-header"><div><p className="eyebrow">STATUS DA FILA</p><h3>Próxima partida</h3></div><span className="queued"><span /> Aberta</span></div><div className="queue-progress"><div><strong>48</strong><span>jogadores buscando</span></div><div className="progress-track"><i /></div><span className="queue-time">00:42</span></div><div className="queue-footer"><span><Users /> 8x8 competitivo</span><span><Gauge /> Latência média 36ms</span></div></section>
    <section className="panel teams-preview"><div className="section-header"><div><p className="eyebrow">COMUNIDADE</p><h3>Times em destaque</h3></div><button className="text-button" onClick={() => onView('teams')}>Ver todos <ChevronRight /></button></div><div className="mini-teams">{teams.slice(0, 3).map((team) => <div className="mini-team" key={team.tag}><div className={`team-logo ${team.color}`}>{team.tag.slice(0, 2)}</div><div><strong>{team.name}</strong><span>{team.players}/10 jogadores</span></div><b>{team.win}</b></div>)}</div></section>
    <section className="panel activity"><div className="section-header"><div><p className="eyebrow">TEMPO REAL</p><h3>Atividade recente</h3></div><Radio className="activity-icon" /></div><div className="activity-list"><div><span className="activity-dot blue-dot" /><p><b>Locutor</b> entrou na fila <small>agora</small></p></div><div><span className="activity-dot purple-dot" /><p><b>FURIA</b> venceu a partida <small>há 2 min</small></p></div><div><span className="activity-dot green-dot" /><p><b>Dust 1.6</b> foi adicionado à votação <small>há 4 min</small></p></div></div></section>
  </div>
}

function Teams({ joined, onJoin }: { joined: string | null, onJoin: (name: string) => void }) {
  return <div className="teams-page"><div className="filter-row"><div className="segmented"><button className="selected">Todos os times</button><button>Abertos</button><button>Em partida</button></div><button className="primary-button"><Plus /> Criar time</button></div><div className="team-grid">{teams.map((team, index) => <article className="team-card panel" key={team.tag}><div className="team-card-top"><div className={`team-emblem ${team.color}`}>{team.tag.slice(0, 2)}</div><span className={index === 3 ? 'team-state playing' : 'team-state'}>{index === 3 ? 'Em partida' : 'Aberto'}</span></div><h3>{team.name}</h3><p className="captain"><Shield /> Capitão <b>{team.captain}</b></p><div className="roster-bar"><div><span>Elenco</span><b>{team.players}/10</b></div><div className="bar"><i style={{ width: `${team.players * 10}%` }} /></div></div><button className={`join-button ${joined === team.tag ? 'joined' : ''}`} onClick={() => onJoin(team.tag)}>{joined === team.tag ? 'Você está no time' : 'Entrar no time'}{joined !== team.tag && <ChevronRight />}</button></article>)}</div></div>
}

function VoteView() {
  const [selected, setSelected] = useState('Mirage Exclusive')
  return <div className="vote-layout"><section className="panel chat-panel"><div className="section-header"><div><p className="eyebrow">SALA DA PARTIDA</p><h3>Conversa do lobby</h3></div><span className="online-count"><span /> 12 online</span></div><div className="messages"><div><span className="chat-avatar">LC</span><p><b>Locutor</b><small>09:41</small><br />qual mapa vai ser?</p></div><div><span className="chat-avatar purple">KS</span><p><b>KSCERATO</b><small>09:42</small><br />Mirage sem pensar duas vezes.</p></div><div><span className="chat-avatar green">YU</span><p><b>yuurih</b><small>09:42</small><br />fechado, bora!</p></div></div><div className="chat-input"><input placeholder="Digite sua mensagem" aria-label="Mensagem do lobby" /><button aria-label="Enviar mensagem"><MessageSquare /></button></div></section><section className="vote-options"><div className="vote-heading"><div><p className="eyebrow blue">VOTAÇÃO ATIVA · 00:18</p><h2>Escolha o próximo mapa</h2></div><div className="vote-round"><Vote /> ROUND 08</div></div><div className="vote-list">{votes.map((vote) => <button key={vote.label} className={`vote-card ${selected === vote.label ? 'selected' : ''}`} onClick={() => setSelected(vote.label)}><div className={`vote-art ${vote.art}`}><Map /></div><div className="vote-info"><span>{vote.type}</span><strong>{vote.label}</strong><div className="vote-bar"><i style={{ width: `${vote.votes * 4}%` }} /></div></div><div className="vote-number"><b>{vote.votes}</b><span>votos</span></div>{selected === vote.label && <div className="checkmark">✓</div>}</button>)}</div></section></div>
}

function Stats() {
  return <div className="stats-page"><div className="stat-cards"><div className="stat-card"><Trophy /><span>Posição no ranking</span><strong>#04</strong><small>+3 posições esta semana</small></div><div className="stat-card"><Crosshair /><span>K/D médio</span><strong>1.53</strong><small className="positive">+12.4% vs. última season</small></div><div className="stat-card"><Gamepad2 /><span>Partidas jogadas</span><strong>128</strong><small>82 vitórias · 46 derrotas</small></div></div><section className="panel leaderboard"><div className="section-header"><div><p className="eyebrow">SEASON 04</p><h3>Ranking da arena</h3></div><div className="rank-filters"><button className="selected">Geral</button><button>Semanal</button></div></div><div className="table-wrap"><table><thead><tr><th>#</th><th>JOGADOR</th><th>TIME</th><th>KILLS</th><th>MORTES</th><th>K/D</th><th>STATUS</th></tr></thead><tbody>{stats.map((row, i) => <tr key={row[0]}><td><span className={`rank rank-${i + 1}`}>{String(i + 1).padStart(2, '0')}</span></td><td><div className="player-cell"><span className={`player-avatar avatar-${i}`}>{row[0].slice(0, 2).toUpperCase()}</span><b>{row[0]}</b></div></td><td><span className="team-tag">{row[1]}</span></td><td>{row[2]}</td><td>{row[3]}</td><td><strong className={Number(row[4]) > 1 ? 'kd-good' : ''}>{row[4]}</strong></td><td><span className="in-match"><span /> Em partida</span></td></tr>)}</tbody></table></div></section></div>
}
