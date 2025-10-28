// AdminPanel.tsx
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { 
  LogIn, 
  LogOut, 
  Users, 
  Mail, 
  Phone, 
  GraduationCap,
  Search,
  Download,
  Loader2,
  Eye,
  X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, auth } from '../utils/firebase';

interface Member {
  name: string;
  email: string;
  phone: string;
  college: string;
}

interface Team {
  id: string;
  teamName: string;
  category: string;
  members: Member[];
  createdAt: any;
}

export function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingTeams, setIsLoadingTeams] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        fetchTeams();
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Filter teams based on search query
    if (searchQuery.trim() === '') {
      setFilteredTeams(teams);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = teams.filter(team => 
        team.teamName.toLowerCase().includes(query) ||
        team.category.toLowerCase().includes(query) ||
        team.members.some(member => 
          member.name.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query) ||
          member.college.toLowerCase().includes(query)
        )
      );
      setFilteredTeams(filtered);
    }
  }, [searchQuery, teams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      toast.success('Login successful!');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setTeams([]);
      setFilteredTeams([]);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const fetchTeams = async () => {
    setIsLoadingTeams(true);
    try {
      const teamsCollection = collection(db, 'teams');
      const q = query(teamsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const teamsData: Team[] = [];
      querySnapshot.forEach((doc) => {
        teamsData.push({
          id: doc.id,
          ...doc.data()
        } as Team);
      });
      
      setTeams(teamsData);
      setFilteredTeams(teamsData);
      toast.success(`Loaded ${teamsData.length} teams`);
    } catch (error) {
      console.error('Error fetching teams:', error);
      toast.error('Failed to load teams');
    } finally {
      setIsLoadingTeams(false);
    }
  };

  const exportToCSV = () => {
    if (filteredTeams.length === 0) {
      toast.error('No data to export');
      return;
    }

    const headers = ['Team Name', 'Category', 'Member Name', 'Email', 'Phone', 'College', 'Registration Date'];
    const rows: string[][] = [];

    filteredTeams.forEach(team => {
      team.members.forEach((member, index) => {
        rows.push([
          index === 0 ? team.teamName : '',
          index === 0 ? team.category : '',
          member.name,
          member.email,
          member.phone,
          member.college,
          index === 0 && team.createdAt ? new Date(team.createdAt.seconds * 1000).toLocaleString() : ''
        ]);
      });
      rows.push(['', '', '', '', '', '', '']); // Empty row between teams
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hackathon-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV exported successfully');
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'web': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'mobile': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'ai-ml': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      'blockchain': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'iot': 'bg-green-500/20 text-green-300 border-green-500/30',
      'open': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    };
    return colors[category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      'web': 'Web Development',
      'mobile': 'Mobile Development',
      'ai-ml': 'AI/ML',
      'blockchain': 'Blockchain',
      'iot': 'IoT',
      'open': 'Open Innovation',
    };
    return labels[category] || category;
  };

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 to-black" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }} />
        </div>

        <motion.div
          className="max-w-md w-full relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-purple-500/40 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-gray-400 mt-2">Sign in to access team registrations</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={20} />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2" size={20} />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 to-black" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-purple-500/20 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-sm text-gray-400">Hackathon Registrations</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={fetchTeams}
                  variant="outline"
                  className="border-purple-500/40 text-purple-300 hover:bg-purple-500/10"
                  disabled={isLoadingTeams}
                >
                  {isLoadingTeams ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    'Refresh'
                  )}
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-red-500/40 text-red-300 hover:bg-red-500/10"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-2 border-blue-500/40 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Teams</p>
                  <p className="text-3xl font-bold text-white mt-1">{teams.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-purple-500/40 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Participants</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {teams.reduce((acc, team) => acc + team.members.length, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-pink-900/20 to-orange-900/20 border-2 border-pink-500/40 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Filtered Results</p>
                  <p className="text-3xl font-bold text-white mt-1">{filteredTeams.length}</p>
                </div>
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-pink-400" />
                </div>
              </div>
            </Card>
          </div>

          {/* Search and Export */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-purple-500/40 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by team name, category, member name, email, or college..."
                  className="pl-10 bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                />
              </div>
              <Button
                onClick={exportToCSV}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              >
                <Download size={18} className="mr-2" />
                Export CSV
              </Button>
            </div>
          </Card>

          {/* Teams List */}
          {isLoadingTeams ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading teams...</p>
            </div>
          ) : filteredTeams.length === 0 ? (
            <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-purple-500/40 p-12 text-center">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                {searchQuery ? 'No teams found matching your search' : 'No teams registered yet'}
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredTeams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-purple-500/40 p-6 hover:border-purple-500/60 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{team.teamName}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs border ${getCategoryColor(team.category)}`}>
                            {getCategoryLabel(team.category)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">
                          {team.createdAt && new Date(team.createdAt.seconds * 1000).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        onClick={() => setSelectedTeam(team)}
                        variant="outline"
                        size="sm"
                        className="border-purple-500/40 text-purple-300 hover:bg-purple-500/10"
                      >
                        <Eye size={16} className="mr-2" />
                        View Details
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {team.members.map((member, idx) => (
                        <div
                          key={idx}
                          className="bg-black/30 border border-purple-500/20 rounded-lg p-4"
                        >
                          <p className="text-sm text-gray-400 mb-2">Member {idx + 1}</p>
                          <p className="text-white font-medium mb-2">{member.name}</p>
                          <div className="space-y-1 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <Mail size={14} />
                              <span className="truncate">{member.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone size={14} />
                              <span>{member.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <GraduationCap size={14} />
                              <span className="truncate">{member.college}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Team Detail Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-2 border-purple-500/60 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedTeam.teamName}</h2>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm border ${getCategoryColor(selectedTeam.category)}`}>
                      {getCategoryLabel(selectedTeam.category)}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {selectedTeam.createdAt && new Date(selectedTeam.createdAt.seconds * 1000).toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedTeam(null)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-red-500/10"
                >
                  <X size={20} />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Team Members</h3>
                  <div className="space-y-4">
                    {selectedTeam.members.map((member, idx) => (
                      <div
                        key={idx}
                        className="bg-black/40 border-2 border-purple-500/30 rounded-lg p-6"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">{idx + 1}</span>
                          </div>
                          <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 text-gray-300">
                            <Mail size={18} className="text-purple-400" />
                            <span>{member.email}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-300">
                            <Phone size={18} className="text-purple-400" />
                            <span>{member.phone}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-300 md:col-span-2">
                            <GraduationCap size={18} className="text-purple-400" />
                            <span>{member.college}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}