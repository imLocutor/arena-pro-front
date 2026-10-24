'use client'

import { useState } from 'react'
import { Bell, ChevronDown, Crown, Crosshair, Gamepad2, Gift, LogOut, MapPin, MessageCircle, Settings, Shield, ShoppingBag, Swords, Trophy, UserPlus, Users, X, Zap } from 'lucide-react'

type Tab = 'lobby' | 'matches' | 'career' | 'leaderboard' | 'loadout' | 'shop'

const tabs: { id: Tab; label: string }[] = [
  { id: 'lobby', label: 'Lobby' }, { id: 'matches', label: 'Partidas' }, { id: 'career', label: 'Carreira' }, { id: 'leaderboard', label: 'Ranking' }, { id: 'loadout', label: 'Loadout' }, { id: 'shop', label: 'Loja' },
]

const friends = [
  { initials: 'KS', name: 'KSCERATO', status: 'Em partida', tone: 'purple' },
  { initials: 'YU', name: 'yuurih', status: 'No lobby', tone: 'cyan' },
  { initials: 'AR', name: 'arT', status: 'Offline', tone: 'orange' },
]

function Brand() {
  return <div className="lobby-brand"><div className="brand-emblem"><Swords /></div><div><strong>ALDEIA ARENA</strong><span>SEASON 04 · PVP</span></div></div>
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>('lobby')
  const [showFriends, setShowFriends] = useState(true)
  const [joined, setJoined] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(['Bem-vindo ao lobby da Aldeia Arena.', 'A fila competitiva está aberta.'])

  function sendMessage() {
    if (!message.trim()) return
    setMessages((current) => [...current, message.trim()])
    setMessage('')
  }

  return <main className="lobby-shell">
    <div className="lobby-backdrop" aria-hidden="true"><div className="sky-glow" /><div className="tower tower-left" /><div className="tower tower-center" /><div className="tower tower-right" /><div className="rooftop" /><div className="hero-character"><div className="head" /><div className="body" /><div className="leg left" /><div className="leg right" /><div className="shadow" /></div></div>
    <div className="vignette" aria-hidden="true" />

    <header className="lobby-header glass-bar">
      <Brand />
      <nav className="top-nav" aria-label="Navegação do lobby">{tabs.map((tab) => <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>)}</nav>
      <div className="header-actions"><div className="credits"><Zap /> 750</div><button className="header-icon" aria-label="Configurações"><Settings /></button><button className="exit-button"><LogOut /> Sair <kbd>ESC</kbd></button></div>
    </header>

    <section className="lobby-heading"><span className="mode-pill"><span /> LOBBY</span><h1>{activeTab === 'lobby' ? 'EQUIPE 1/5' : tabs.find((tab) => tab.id === activeTab)?.label.toUpperCase()}</h1><p>{activeTab === 'lobby' ? 'Todos entram juntos — o time será dividido quando o cronômetro chegar a zero.' : 'Acompanhe seu progresso e prepare-se para a próxima partida.'}</p></section>

    <aside className={`friends-panel glass-card ${showFriends ? '' : 'closed'}`}><div className="card-heading"><div className="heading-icon"><Users /></div><div><h2>AMIGOS</h2><p>Convide jogadores para o seu lobby.</p></div><button className="close-friends" onClick={() => setShowFriends(false)} aria-label="Fechar amigos"><X /></button></div><div className="friend-tabs"><button className="active">AMIGOS <b>3</b></button><button>SOLICITAÇÕES <b>1</b></button><button onClick={() => setShowFriends(true)}>ADICIONAR</button></div><div className="friend-list">{friends.map((friend) => <div className="friend" key={friend.name}><span className={`friend-avatar ${friend.tone}`}>{friend.initials}</span><div><strong>{friend.name}</strong><small>{friend.status}</small></div><span className={`presence ${friend.status === 'Offline' ? 'offline' : ''}`} /></div>)}</div><div className="invite-row"><input placeholder="ID DO JOGADOR" aria-label="ID do jogador" /><button aria-label="Enviar convite"><UserPlus /></button></div></aside>
    {!showFriends && <button className="friends-tab" onClick={() => setShowFriends(true)}><Users /> Amigos</button>}

    <div className="toast"><Bell /><span><b>Servidor online</b><small>37 ms · 128 jogadores conectados</small></span></div>

    <section className="bottom-area"><div className="chat-widget glass-card"><div className="chat-title"><MessageCircle /> CHAT DO LOBBY <span>12 online</span></div><div className="chat-messages">{messages.map((item, index) => <p key={`${item}-${index}`}><b>{index % 2 ? 'KSCERATO' : 'ALDEIA'}</b> {item}</p>)}</div><form className="chat-form" onSubmit={(event) => { event.preventDefault(); sendMessage() }}><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Pressione T para digitar no chat..." aria-label="Chat do lobby" /></form></div><div className="squad-bar"><div className="squad-slot add-slot"><span>+</span><small>CONVIDAR</small></div><div className="squad-slot add-slot"><span>+</span><small>CONVIDAR</small></div><div className="player-slot"><div className="player-avatar">LC</div><div><strong>Locutor</strong><span>750 ELO · Rank #04</span></div><Crown /></div><div className="squad-slot add-slot"><span>+</span><small>CONVIDAR</small></div><div className="squad-slot add-slot"><span>+</span><small>CONVIDAR</small></div></div></section>

    <aside className="match-card glass-card"><div className="match-row"><span>MODALIDADE</span><b><Swords /> KOS WARS</b></div><div className="match-row"><span>MAPA</span><b><MapPin /> RANDOM</b></div><div className="match-row"><span>RATING</span><b>750</b></div><div className="match-rule" /><button className={`start-button ${joined ? 'queued' : ''}`} onClick={() => setJoined(!joined)}>{joined ? <><span className="queue-dot" /> NA FILA · CANCELAR</> : <><Gamepad2 /> COMEÇAR</>}</button></aside>
    <footer className="lobby-footer"><span><Crosshair /> ALDEIA ARENA</span><span>BUILD 04.18.26</span><span>ESC MENU</span></footer>
  </main>
}
