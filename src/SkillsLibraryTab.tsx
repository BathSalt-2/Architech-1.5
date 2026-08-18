import React, { stateEnv } from 'react';
import { Search, Zap, Brain, Palette, Cog, GitBranch, ShoppingCart, Rocket, Users, Handshake, Star, Gamepad2 } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  capabilities: string[];
  triggers: string[];
  color: string;
}
