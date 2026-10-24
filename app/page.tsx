'use client'

import { useState } from 'react'
import { Check, ChevronLeft, Crown, Crosshair, Gamepad2, Map as MapIcon, MessageCircle, Settings, Swords, Users, X, Zap } from 'lucide-react'

type Tab = 'lobby' | 'matches' | 'career' | 'leaderboard' | 'loadout' | 'shop'
const tabs: { id: Tab; label: string }[] = [
  { id: 'lobby', label: 'Lobby' }, { id: 'matches', label: 'Partidas' }, { id: 'career', label: 'Carreira' }, { id: 'leaderboard', label: 'Ranking' }, { id: 'loadout', label: 'Loadout' }, { id: 'shop', label: 'Loja' },
]
const maps = [
  { name: 'ANCIENT', tone: 'ancient', status: 'SUA ESCOLHA', pick: 'team' },
  { name: 'CACHE', tone: 'cache', status: 'DISPONÍVEL', pick: '' },
  { name: 'ANUBIS', tone: 'anubis', status: 'DISPONÍVEL', pick: '' },
  { name: 'INFERNO', tone: 'inferno', status: 'DISPONÍVEL', pick: '' },
  { name: 'MIRAGE', tone: 'mirage', status: 'ESCOLHA INIMIGA', pick: 'enemy' },
  { name: 'DUST II', tone: 'dust', status: 'ESCOLHA INIMIGA', pick: 'enemy' },
  { name: 'NUKE', tone: 'nuke', status: 'SUA ESCOLHA', pick: 'team' },
]

function Header({ activeTab, setActiveTab }: { activeTab: Tab; setActiveTab: (tab: Tab) => void }) {
  return <header className="lobby-header glass-bar"><div className="lobby-brand"><div className="brand-emblem"><Swords /></div><div><strong>ALDEIA ARENA</strong><span>SEASON 04 · PVP</span></div></div><nav className="top-nav" aria-label="Navegação principal">{tabs.map((tab) => <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>)}</nav><div className="header-actions"><div className="credits"><Zap /> 750</div><button className="header-icon" aria-label="Configurações"><Settings /></button><button className="exit-button">SAIR <kbd>ESC</kbd></button></div></header>
}

function TeamPanel({ opponent = false }: { opponent?: boolean }) {
  const players = opponent ? [['AX', '29,183'], ['VP', '26,983'], ['NX', '26,700'], ['BL', '24,995'], ['RX', '24,424']] : [['LC', '27,343'], ['DK', '26,361'], ['RT', '26,398'], ['TV', '26,303'], ['LG', '19,954']]
  return <div className={`team-panel ${opponent ? 'opponent' : ''}`}><div className="team-title"><span />{opponent ? 'OPONENTE' : 'SEU TIME'}</div>{players.map(([initials, elo], index) => <div className="team-player" key={initials}><i className={`team-avatar avatar-${index}`}>{initials}</i><b>{elo}</b><span>{opponent ? ['Rival', 'Spectre', 'Nox', 'Blitz', 'Rex'][index] : ['Locutor', 'KSCERATO', 'yuurih', 'arT', 'Fallen'][index]}</span></div>)}</div>
}

function MapSelection({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState('ANCIENT')
  return <main className="map-selection"><div className="map-lines" aria-hidden="true" /><Header activeTab="matches" setActiveTab={() => {}} /><button className="map-back" onClick={onBack}><ChevronLeft /> VOLTAR AO LOBBY</button><section className="map-title"><span className="map-status-dot" /><h1>SELEÇÃO DE MAPA</h1><p>Escolha seu mapa. A votação será encerrada quando todos estiverem prontos.</p></section><div className="map-orbit" aria-hidden="true"><div className="radar-grid"><span /><span /><span /><span /><span /><span /></div><div className="radar-shape" /></div><section className="map-grid" aria-label="Mapas disponíveis">{maps.map((map) => <button key={map.name} className={`map-card map-${map.tone} ${selected === map.name ? 'selected' : ''} ${map.pick === 'enemy' ? 'enemy-pick' : ''}`} onClick={() => map.status === 'DISPONÍVEL' && setSelected(map.name)}><span className="map-art" /><span className="map-card-shade" /><strong>{map.name}</strong><small>{selected === map.name ? 'SUA ESCOLHA' : map.status}</small>{selected === map.name && <Check className="map-check" />}</button>)}</section><TeamPanel /><TeamPanel opponent /><div className="map-chat"><MessageCircle /> <span>CHAT DO TIME</span><p><b>ALDEIA</b> Bora fechar Ancient?</p><p><b>KSCERATO</b> Escolhi o mapa.</p></div><div className="map-footer"><span><Crosshair /> ALDEIA ARENA</span><span>VOTAÇÃO · 00:18</span><span>BUILD 04.18.26</span></div></main>
}

function Lobby({ activeTab, setActiveTab }: { activeTab: Tab; setActiveTab: (tab: Tab) => void }) {
  const [joined, setJoined] = useState(false)
  return <main className="lobby-shell"><div className="lobby-backdrop" aria-hidden="true"><div className="sky-glow" /><div className="tower tower-left" /><div className="tower tower-center" /><div className="tower tower-right" /><div className="rooftop" /><div className="hero-character"><div className="head" /><div className="body" /><div className="leg left" /><div className="leg right" /><div className="shadow" /></div></div><div className="vignette" aria-hidden="true" /><Header activeTab={activeTab} setActiveTab={setActiveTab} /><section className="lobby-heading"><span className="mode-pill"><span /> LOBBY</span><h1>EQUIPE 1/5</h1><p>Todos entram juntos — o time será dividido quando o cronômetro chegar a zero.</p></section><aside className="friends-panel glass-card"><div className="card-heading"><div className="heading-icon"><Users /></div><div><h2>AMIGOS</h2><p>Convide jogadores para o seu lobby.</p></div><X /></div><div className="friend-tabs"><button className="active">AMIGOS <b>3</b></button><button>SOLICITAÇÕES <b>1</b></button><button>ADICIONAR</button></div>{[['KS', 'KSCERATO', 'Em partida'], ['YU', 'yuurih', 'No lobby'], ['AR', 'arT', 'Offline']].map(([initials, name, status]) => <div className="friend" key={name}><span className="friend-avatar cyan">{initials}</span><div><strong>{name}</strong><small>{status}</small></div><span className="presence" /></div>)}</aside><div className="toast"><Zap /><span><b>Servidor online</b><small>37 ms · 128 jogadores conectados</small></span></div><div className="bottom-area"><div className="chat-widget glass-card"><div className="chat-title"><MessageCircle /> CHAT DO LOBBY</div><p><b>ALDEIA</b> Bem-vindo ao lobby.</p><p><b>KSCERATO</b> A fila está aberta.</p></div><div className="squad-bar"><div className="squad-slot add-slot">+</div><div className="squad-slot add-slot">+</div><div className="player-slot"><div className="player-avatar">LC</div><div><strong>Locutor</strong><span>750 ELO · Rank #04</span></div><Crown /></div><div className="squad-slot add-slot">+</div><div className="squad-slot add-slot">+</div></div></div><aside className="match-card glass-card"><div className="match-row"><span>MODALIDADE</span><b><Swords /> KOS WARS</b></div><div className="match-row"><span>MAPA</span><b><MapIcon /> VOTAÇÃO</b></div><div className="match-row"><span>RATING</span><b>750</b></div><div className="match-rule" /><button className={`start-button ${joined ? 'queued' : ''}`} onClick={() => setJoined(!joined)}>{joined ? 'NA FILA · CANCELAR' : <><Gamepad2 /> COMEÇAR</>}</button></aside><footer className="lobby-footer"><span><Crosshair /> ALDEIA ARENA</span><span>BUILD 04.18.26</span><span>ESC MENU</span></footer></main>
}

export default function Page() { const [activeTab, setActiveTab] = useState<Tab>('lobby'); return activeTab === 'matches' ? <MapSelection onBack={() => setActiveTab('lobby')} /> : <Lobby activeTab={activeTab} setActiveTab={setActiveTab} /> }
