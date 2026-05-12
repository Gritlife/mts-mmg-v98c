import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2'
import {
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Zap,
  Award,
} from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
)

export const Route = createFileRoute('/')({
  component: Home,
})

// ─── Mock Data ───────────────────────────────────────────────────────────────

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const weeks = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8']

const revenueData = {
  labels: months,
  datasets: [
    {
      label: 'This Year',
      data: [42000, 55000, 48000, 63000, 58000, 72000, 68000, 81000, 74000, 89000, 82000, 96000],
      backgroundColor: 'rgba(99, 102, 241, 0.85)',
      borderRadius: 8,
      borderSkipped: false,
    },
    {
      label: 'Last Year',
      data: [32000, 41000, 38000, 49000, 44000, 56000, 51000, 62000, 57000, 68000, 63000, 74000],
      backgroundColor: 'rgba(199, 210, 254, 0.7)',
      borderRadius: 8,
      borderSkipped: false,
    },
  ],
}

const userActivityData = {
  labels: weeks,
  datasets: [
    {
      label: 'Active Users',
      data: [3200, 4100, 3800, 5200, 4700, 6100, 5800, 7200],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.12)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(16, 185, 129)',
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      label: 'New Signups',
      data: [420, 610, 530, 780, 650, 890, 720, 1050],
      borderColor: 'rgb(245, 158, 11)',
      backgroundColor: 'rgba(245, 158, 11, 0.08)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(245, 158, 11)',
      pointRadius: 5,
      pointHoverRadius: 7,
    },
  ],
}

const channelData = {
  labels: ['Organic', 'Paid Search', 'Social', 'Referral', 'Email', 'Direct'],
  datasets: [
    {
      data: [31, 22, 18, 14, 9, 6],
      backgroundColor: [
        'rgba(99, 102, 241, 0.85)',
        'rgba(16, 185, 129, 0.85)',
        'rgba(245, 158, 11, 0.85)',
        'rgba(239, 68, 68, 0.85)',
        'rgba(236, 72, 153, 0.85)',
        'rgba(14, 165, 233, 0.85)',
      ],
      borderWidth: 0,
      hoverOffset: 6,
    },
  ],
}

const teamRadarData = {
  labels: ['Velocity', 'Quality', 'Collaboration', 'Innovation', 'Delivery', 'Satisfaction'],
  datasets: [
    {
      label: 'Engineering',
      data: [88, 92, 78, 85, 90, 87],
      borderColor: 'rgba(99, 102, 241, 1)',
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      pointBackgroundColor: 'rgba(99, 102, 241, 1)',
    },
    {
      label: 'Design',
      data: [72, 95, 91, 96, 80, 93],
      borderColor: 'rgba(236, 72, 153, 1)',
      backgroundColor: 'rgba(236, 72, 153, 0.15)',
      pointBackgroundColor: 'rgba(236, 72, 153, 1)',
    },
    {
      label: 'Product',
      data: [80, 85, 90, 88, 85, 91],
      borderColor: 'rgba(16, 185, 129, 1)',
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
      pointBackgroundColor: 'rgba(16, 185, 129, 1)',
    },
  ],
}

const taskCompletionData = {
  labels: ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'Support'],
  datasets: [
    {
      label: 'Completed',
      data: [87, 92, 78, 65, 71, 84],
      backgroundColor: [
        'rgba(99, 102, 241, 0.85)',
        'rgba(236, 72, 153, 0.85)',
        'rgba(16, 185, 129, 0.85)',
        'rgba(245, 158, 11, 0.85)',
        'rgba(14, 165, 233, 0.85)',
        'rgba(168, 85, 247, 0.85)',
      ],
      borderRadius: 6,
      borderSkipped: false,
    },
    {
      label: 'Target',
      data: [90, 90, 85, 80, 80, 85],
      backgroundColor: 'rgba(226, 232, 240, 0.5)',
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
}

// ─── Stat cards ──────────────────────────────────────────────────────────────

const stats = [
  {
    title: 'Total Revenue',
    value: '$828K',
    change: '+18.4%',
    up: true,
    icon: DollarSign,
    gradient: 'from-indigo-500 to-violet-600',
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
  },
  {
    title: 'Active Users',
    value: '38,920',
    change: '+12.1%',
    up: true,
    icon: Users,
    gradient: 'from-emerald-400 to-teal-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
  },
  {
    title: 'Tasks Completed',
    value: '4,721',
    change: '+9.3%',
    up: true,
    icon: CheckCircle,
    gradient: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
    text: 'text-amber-600',
  },
  {
    title: 'Team Velocity',
    value: '94 pts',
    change: '-2.5%',
    up: false,
    icon: Zap,
    gradient: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
    text: 'text-pink-600',
  },
  {
    title: 'Sprint Goal Hit',
    value: '87%',
    change: '+5.0%',
    up: true,
    icon: Target,
    gradient: 'from-sky-400 to-blue-600',
    bg: 'bg-sky-50',
    text: 'text-sky-600',
  },
  {
    title: 'Satisfaction Score',
    value: '4.8 / 5',
    change: '+0.3',
    up: true,
    icon: Award,
    gradient: 'from-purple-500 to-fuchsia-600',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
  },
]

// ─── Activity feed ────────────────────────────────────────────────────────────

const activities = [
  { user: 'Sarah K.', action: 'closed sprint #42 with 94% completion', time: '2m ago', color: 'bg-emerald-500' },
  { user: 'Alex M.', action: 'merged PR: "Add real-time notifications"', time: '18m ago', color: 'bg-indigo-500' },
  { user: 'Jordan L.', action: 'shipped new onboarding flow to production', time: '1h ago', color: 'bg-amber-500' },
  { user: 'Riley P.', action: 'hit $100K MRR milestone 🎉', time: '3h ago', color: 'bg-pink-500' },
  { user: 'Casey T.', action: 'resolved 12 customer tickets', time: '5h ago', color: 'bg-sky-500' },
  { user: 'Morgan W.', action: 'published Q2 product roadmap', time: '8h ago', color: 'bg-violet-500' },
  { user: 'Drew N.', action: 'completed A/B test — variant B wins (+14%)', time: '1d ago', color: 'bg-teal-500' },
]

// ─── Top performers ───────────────────────────────────────────────────────────

const performers = [
  { name: 'Sarah K.', role: 'Engineering', tasks: 42, score: 98, avatar: 'SK' },
  { name: 'Jordan L.', role: 'Product', tasks: 37, score: 95, avatar: 'JL' },
  { name: 'Alex M.', role: 'Engineering', tasks: 35, score: 93, avatar: 'AM' },
  { name: 'Riley P.', role: 'Sales', tasks: 31, score: 91, avatar: 'RP' },
  { name: 'Casey T.', role: 'Support', tasks: 28, score: 88, avatar: 'CT' },
]

const roleColors: Record<string, string> = {
  Engineering: 'bg-indigo-100 text-indigo-700',
  Product: 'bg-emerald-100 text-emerald-700',
  Sales: 'bg-sky-100 text-sky-700',
  Support: 'bg-amber-100 text-amber-700',
  Design: 'bg-pink-100 text-pink-700',
}

const avatarColors = [
  'bg-indigo-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-pink-500',
  'bg-sky-500',
]

// ─── Component ────────────────────────────────────────────────────────────────

function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">TeamPulse</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              Q2 2026 · Live
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Internal Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Team metrics, revenue, and activity — updated daily</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`${stat.bg} p-2.5 rounded-xl`}>
                  <stat.icon className={`w-5 h-5 ${stat.text}`} />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {stat.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts row 1 — Revenue + Activity */}
        {mounted && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Revenue Bar */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">Monthly Revenue</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Year-over-year comparison</p>
                  </div>
                  <div className="flex gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block bg-indigo-500" />This year</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block bg-indigo-200" />Last year</span>
                  </div>
                </div>
                <Bar
                  data={revenueData}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false }, tooltip: { mode: 'index' } },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.04)' },
                        ticks: { callback: (v) => `$${Number(v) / 1000}k` },
                      },
                      x: { grid: { display: false } },
                    },
                  }}
                />
              </div>

              {/* Channel Doughnut */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="mb-4">
                  <h2 className="text-base font-semibold text-slate-900">Traffic by Channel</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Acquisition sources this quarter</p>
                </div>
                <div className="flex flex-col items-center justify-center h-[calc(100%-60px)]">
                  <Doughnut
                    data={channelData}
                    options={{
                      responsive: true,
                      cutout: '68%',
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: { boxWidth: 12, padding: 12, font: { size: 11 } },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Charts row 2 — User Activity + Team Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* User Activity Line */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">User Activity</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Weekly active users & new signups</p>
                  </div>
                </div>
                <Line
                  data={userActivityData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } },
                      tooltip: { mode: 'index' },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.04)' },
                        ticks: { callback: (v) => Number(v) >= 1000 ? `${Number(v) / 1000}k` : v },
                      },
                      x: { grid: { display: false } },
                    },
                  }}
                />
              </div>

              {/* Team Radar */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="mb-4">
                  <h2 className="text-base font-semibold text-slate-900">Team Performance</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Score across 6 dimensions (0–100)</p>
                </div>
                <Radar
                  data={teamRadarData}
                  options={{
                    responsive: true,
                    scales: {
                      r: {
                        min: 0,
                        max: 100,
                        ticks: { stepSize: 25, font: { size: 9 } },
                        grid: { color: 'rgba(0,0,0,0.06)' },
                        pointLabels: { font: { size: 11 } },
                      },
                    },
                    plugins: {
                      legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
                    },
                  }}
                />
              </div>
            </div>

            {/* Task Completion by Team */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Task Completion by Team</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Completed vs. sprint target (%)</p>
                </div>
              </div>
              <div className="max-h-64">
                <Bar
                  data={taskCompletionData}
                  options={{
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } },
                      tooltip: { mode: 'index' },
                    },
                    scales: {
                      x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { callback: (v) => `${v}%` },
                        grid: { color: 'rgba(0,0,0,0.04)' },
                      },
                      y: { grid: { display: false } },
                    },
                  }}
                />
              </div>
            </div>
          </>
        )}

        {/* Bottom row — Activity feed + Top performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
          {/* Activity feed */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-5">Recent Activity</h2>
            <div className="space-y-4">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`${a.color} w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <span className="text-white text-[10px] font-bold">{a.user.split(' ').map(p => p[0]).join('')}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold">{a.user}</span>{' '}{a.action}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top performers */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-5">Top Performers</h2>
            <div className="space-y-3">
              {performers.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`${avatarColors[i]} w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-xs font-bold">{p.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-800">{p.name}</span>
                      <span className="text-sm font-bold text-slate-900">{p.score}<span className="text-slate-400 font-normal text-xs">/100</span></span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${roleColors[p.role] ?? 'bg-slate-100 text-slate-600'}`}>{p.role}</span>
                      <span className="text-xs text-slate-400">{p.tasks} tasks</span>
                    </div>
                    {/* Score bar */}
                    <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${
                          i === 0 ? 'from-indigo-400 to-violet-500'
                          : i === 1 ? 'from-emerald-400 to-teal-500'
                          : i === 2 ? 'from-amber-400 to-orange-500'
                          : i === 3 ? 'from-sky-400 to-blue-500'
                          : 'from-purple-400 to-fuchsia-500'
                        }`}
                        style={{ width: `${p.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
