import React, { useState } from 'react';
import SkillsLibraryTab from './SkillsLibraryTab';
import SyntheticDataForgeTab from './SyntheticDataForgeTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  return (
    <div style={{minHeight:'100vh',background:'#0f172a',color:'#fff'}}>
      <div style={{display:'flex',gap:'8px',padding:'16px'}}>
        <button onClick={() => setActiveTab('home')}>Home</button>
        <button onClick={() => setActiveTab('skills')}>⚡ Skills</button>
        <button onClick={() => setActiveTab('sdg')}>🗄️ SDG</button>
      </div>
      {activeTab === 'skills' && <SkillsLibraryTab />}
      {activeTab === 'sdg' && <SyntheticDataForgeTab />}
      {activeTab === 'home' && <div style={{padding:'32px'}}>Welcome</div>}
    </div>
  );
}
