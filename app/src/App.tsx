import { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { trpc } from '@/providers/trpc'
import { applyContentOverrides } from '@/config/content'
import Home from './pages/Home'
import DeltaForce from './pages/DeltaForce'
import { BingoSetup, BingoRoomView } from './pages/Bingo'
import Players from './pages/Players'
import PlayerDetail from './pages/PlayerDetail'
import Recruit from './pages/Recruit'
import Admin from './pages/Admin'
import FunOrder from './pages/FunOrder'

export default function App() {
  // 启动时拉取后台保存的文案/图片覆盖值，合并后再渲染页面；失败则用默认文案
  const contentQ = trpc.content.all.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 60_000,
  });
  useEffect(() => {
    if (contentQ.data) applyContentOverrides(contentQ.data);
  }, [contentQ.data]);

  if (contentQ.isLoading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#f6f8ff", color: "#8a94b8", fontSize: 14, letterSpacing: 4,
      }}>
        加载中…
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/players" element={<Players />} />
      <Route path="/player/:id" element={<PlayerDetail />} />
      <Route path="/recruit" element={<Recruit />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/game/delta-force" element={<DeltaForce />} />
      <Route path="/game/delta-force/bingo" element={<BingoSetup />} />
      <Route path="/game/delta-force/fun/:slug" element={<FunOrder />} />
      <Route path="/room/:code" element={<BingoRoomView />} />
    </Routes>
  )
}
